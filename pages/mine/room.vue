<template>
	<view class="room">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-4xl text-black"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center">
				<view style="display: flex;align-items: center;color: #666;font-size: 36rpx;">
					<view style="margin-right: 25rpx;position: relative;" @click="tabClick(0)">
						<text style="font-size: 36rpx;color: #333;position: relative;z-index: 5;">我的房间</text>
						<view v-if="navbarCurrentIndex==0" class="headLine"></view>
					</view>
					<view style="margin-left: 25rpx;position: relative;" @click="tabClick(1)">
						<text style="font-size: 36rpx;color: #333;position: relative;z-index: 5;">我的足迹</text>
						<view v-if="navbarCurrentIndex==1" class="headLine"></view>
					</view>
				</view>
			</view>
		</u-navbar>
		<view style="padding: 0rpx 30rpx;box-sizing: border-box;">
			<block v-if="lists.length !=0">
				<view class="item" v-for="(item,index) in lists" :key="index" @click="openRoom(item)">
					<image style="width: 95rpx;height: 95rpx;border-radius: 50%;margin-right: 12rpx;"
						:src="item.room_image" mode="aspectFill">
					</image>
					<view style="flex: 1;">
						<view style="display: flex;align-items: center;">
							<text class="fontFamily" style="color: #333;font-size: 26rpx;">{{item.room_name}}</text>
							<text
								style="font-size: 23rpx;padding-left: 10rpx;border-left: 1px solid #999999;margin-left: 10rpx;color: #999999;">{{item.public_type_str}}</text>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;">
							<view style="font-size:20rpx ;color: #333;">
								{{item.type_name}}
							</view>
							<block v-if="item.nums!=0">
								<view class="userImages">
									<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
										<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
										</image>
									</block>
									<text style="margin-left: 5rpx;color: #333;font-size: 20rpx;">
										<text>{{item.nums}}</text>
										人在线</text>
								</view>
							</block>
						</view>
					</view>
				</view>
			</block>
			<view v-else style="text-align: center;margin-top: 50rpx;">
				<image style="width: 393rpx;height: 416rpx;" src="@/static/iconImage/jilu.png" mode="aspectFill">
				</image>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navbarCurrentIndex: 0,
				lists: [],
				page: 1
			}
		},
		onShow() {
			this.lists = [];
			this.page = 1;
			this.getList()
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.getList()
		},
		methods: {
			tabClick(index) {
				this.lists = [];
				this.page = 1;
				this.navbarCurrentIndex = index;
				this.getList()
			},
			getList() {
				if (this.navbarCurrentIndex == 0) {
					this.$api("room.roomList", {
						page: this.page
					}).then(res => {
						if (res.code == 1) {
							this.lists.push(...res.data.list)
						}
					})
				} else {
					this.$api("room.roomlogList", {
						page: this.page
					}).then(res => {
						if (res.code == 1) {
							this.lists.push(...res.data.list)
						}
					})
				}
			},
			openRoom(item) {
				this.$u.route("/pages/chat/chatRoom", {
					roomId: item.room_id,
					type: item.type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #f7f7f7;
	}

	.room {
		background: #f7f7f7;
		height: 100%;
		min-height: 100vh;
	}

	.headLine {
		width: 100%;
		height: 19rpx;
		background: #FFA000;
		position: absolute;
		left: 0;
		bottom: 5rpx;
	}

	.item {
		background: #fff;
		width: 100%;
		height: 153rpx;
		border-radius: 20rpx;
		position: relative;
		padding: 25rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-top: 50rpx;

		.qushuiSubTitle {
			display: flex;
			align-items: center;
			height: 35rpx;
			background: red;
			width: 30%;
			border-radius: 50rpx;

			.subText {
				font-size: 23rpx;
				color: #333;
				font-weight: bold;
				line-height: 35rpx;
				padding-left: 25rpx;
			}
		}

		.chengyuBg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
		}
	}

	.userImages {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: #333;

		.userImageItem {
			width: 25rpx;
			height: 25rpx;
			border-radius: 50%;
			margin-left: -15rpx;

			&:first-child {
				margin: 0;
			}
		}
	}
</style>