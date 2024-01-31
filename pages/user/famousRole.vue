<template>
	<view>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 360rpx;"
			src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/mingrentang.png" mode="">
		</image>
		<view class="seach">
			<u-navbar :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
			<view class="myInput" @click="$u.route('pages/user/newSearch')">
				<view class="searchIcon">
					<text class="ri-search-line " style="font-size: 35rpx;color: #FE4373;"></text>
				</view>
			</view>
		</view>
		<view style="height: 360rpx;"></view>
		<view class="lists">
			<view class="item" v-for="(item,index) in lists" :key="index">
				<view style="display: flex;align-items: center;">
					<image :src="item.avatar" style="width: 88rpx;height: 88rpx;border-radius: 50%;" mode=""
						@click="openUserHome(item)">
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
							<view v-if="item.titles"
								@click="$u.route('pages/user/combination',{titles:item.titles.split(',')[0],role_title_id:item.role_title_id.split(',')[0]})"
								style="width: 126rpx;height: 40rpx;line-height: 40rpx;text-align: center;color: #fff;border-radius: 10rpx;background-color: #FE4373;font-size: 23rpx;margin-left: 13rpx;">
								{{item.titles.split(",")[0]}}
							</view>
						</view>
						<view style="font-size: 25rpx;color: #3D3D3D;opacity: 0.6;margin-top: 10rpx;">
							{{item.achievements}}
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view style="width: 39rpx;height: 39rpx;border-radius: 50%;margin-right: 10rpx;">
						<image :src="item.mw_image" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<text style="font-size: 28rpx; color: #3D3D3D;width: 100rpx;">{{item.total_mw}}</text>
				</view>
			</view>
			<u-empty v-if="!lists.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [],
				page: 1
			};
		},
		onLoad() {
			this.searchName()
		},
		onReachBottom() {
			this.page++;
			this.searchName()
		},
		methods: {
			openUserHome(item) {
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo.id == item.id) {
					uni.switchTab({
						url: "/pages/index/mine"
					})
				} else {
					this.$u.route('pages/user/home', {
						user_id: item.id
					})
				}
			},
			searchName() {
				let that = this
				that.$api('role_title.hall_of_fame', {
					page: that.page,
					limit: 10
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						that.lists = [...that.lists, ...res.data]
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
		padding: 0rpx 93rpx;
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