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
			<view style="font-size: 56rpx;color: #3D3D3D;padding-top: 70rpx;padding-left: 50rpx;">{{titles}}</view>
		</view>
		<view style="height: 360rpx;"></view>
		<view class="lists">
			<view class="item" v-for="(item,index) in roleList" :key="index">
				<view style="display: flex;align-items: center;">
					<block v-if="item.user_avatar == null">
						<block v-if="item.gender == 2">
							<image src="/static/avatar-female.png" mode=""
								style="width: 88rpx;height: 88rpx;border-radius: 50%;"></image>
						</block>
						<block v-if="item.gender == 1">
							<image src="/static/avatar.png" mode=""
								style="width: 88rpx;height: 88rpx;border-radius: 50%;"></image>
						</block>
					</block>
					<image @click="openUserHome(item)" v-else :src="item.user_avatar"
						style="width: 88rpx;height: 88rpx;border-radius: 50%;" mode="">
					</image>
					<view style="margin-left: 30rpx;flex: 1;margin-right: 10rpx;">
						<view style="font-size: 32rpx;color: #3D3D3D;display: flex;align-items: center;">
							<text @click="openUserHome(item)">{{item.realname}}·{{item.dynasty}}</text>
							<block v-if="item.gender == 2">
								<text class="ri-women-fill"
									style="margin-left: 15rpx;color: #E87B7B;font-size: 25rpx;"></text>
							</block>
							<block v-if="item.gender == 1">
								<text class="ri-men-fill"
									style="margin-left: 15rpx;color: #8FB992;font-size: 25rpx;"></text>
							</block>
						</view>
						<view style="font-size: 25rpx;color: #3D3D3D;opacity: 0.6;margin-top: 10rpx;">
							{{item.achievements}}
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;" v-if="item.user_id != null">
					<view style="width: 39rpx;height: 39rpx;border-radius: 50%;margin-right: 10rpx;">
						<image :src="item.mw_image" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<text style="font-size: 28rpx; color: #3D3D3D;width: 100rpx;">{{item.user_total_mw}}</text>
				</view>
				<view v-else @click="$u.route('/pages/mine/role')"
					style="margin-right: 26rpx;width: 97rpx;height: 40rpx;background: #FE4373;border-radius: 100rpx 100rpx 100rpx 100rpx;opacity: 1;color: #fff;font-size: 25rpx;text-align: center;line-height: 40rpx;">
					获取
				</view>
			</view>
			<u-empty v-if="!roleList.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roleList: [],
				titles: "",
				page: 1,
				role_id: ''
			};
		},
		onLoad(e) {
			this.titles = e.titles;
			this.role_id = e.role_title_id;
			this.searchName()
		},
		onReachBottom() {
			this.page++;
			this.searchName()
		},
		methods: {
			openUserHome(item) {
				if (item.user_id == null) {
					uni.showToast({
						icon: "none",
						title: "角色未注册"
					})
					return;
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo.id == item.user_id) {
					uni.switchTab({
						url: "/pages/index/mine"
					})
				} else {
					this.$u.route('pages/user/home', {
						user_id: item.user_id
					})
				}
			},
			searchName() {
				let that = this
				that.$api('user.recommend', {
					page: that.page,
					keywords: "",
					role_title_id: that.role_id
				}).then(res => {
					if (res.code === 1) {
						that.roleList = [...that.roleList, ...res.data];
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lists {
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;

		.item {
			padding: 26rpx 0rpx 26rpx 26rpx;
			margin-bottom: 26rpx;
			box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
			border-radius: 6rpx 6rpx 6rpx 6rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
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