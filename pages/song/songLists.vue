<template>
	<view>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 360rpx;"
			src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/duiGe/duigeTop.png" mode="">
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
					<view @click="$u.route('pages/song/songPublish')"
						style="margin-left: 30rpx;width: 185rpx;height: 65rpx;text-align: center;line-height: 65rpx;border-radius: 10rpx;color: #fff;background: #FE4373;font-size: 28rpx;">
						起个头</view>
				</view>
			</view>
		</view>
		<view style="height: 360rpx;"></view>
		<view style="margin: 0 auto;">
			<u-empty v-if="!lists.length" icon="/static/empty2.png" text="暂无对歌内容" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<view class="lists">
			<block v-for="(item,index) in lists" :key="index">
				<view class="items" @click="$u.route('pages/song/songDetails',{songId:item.id})">
					<view class="titleImg">
						<block v-if="item.background_image==''">
							<block v-if="item.user_background_image==''">
								<image class="img" src="@/static/userBg.png" mode="aspectFill"></image>
							</block>
							<block v-if="item.user_background_image!=''">
								<image class="img" :src="item.user_background_image" mode="aspectFill"></image>
							</block>
						</block>
						<block v-if="item.background_image!=''">
							<image class="img" :src="item.background_image" mode="aspectFill"></image>
						</block>
					</view>
					<view style="display: flex;align-items: center;margin-top: 20rpx;">
						<block v-if="item.role_realname!=null">
							<text
								style="font-size: 28rpx;color: #767676;">{{item.role_realname}}·{{item.role_dynasty}}</text>
						</block>
						<block v-else>
							<text style="font-size: 28rpx;color: #767676;">无名氏</text>
						</block>
						<block v-if="item.gender == 1">
							<text class="ri-men-fill"
								style="margin-left: 15rpx;color: #8FB992;font-size: 19rpx;"></text>
						</block>
						<block v-if="item.gender == 2">
							<text class="ri-women-fill"
								style="margin-left: 10rpx;color: #E87B7B;font-size: 19rpx;"></text>
						</block>
					</view>
					<view
						style="color: 28rpx;font-size: 28rpx;margin-top: 15rpx;padding: 0rpx 10rpx;box-sizing: border-box;">
						{{item.song_title||"暂无主题"}}
					</view>
					<view class="songBtn">
						<view class="ri-voiceprint-line" style="color: #fff;font-size: 28rpx;" v-for="(item,index) in 2"
							:key="index">
						</view>
					</view>
				</view>
			</block>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				lists: [],
				viewThisCode: 0
			}
		},
		onLoad() {
			var that = this;
			this.getList();
			uni.$on('songUpdate', function(data) {
				that.lists = [];
				that.page = 1;
				that.viewThisCode = 0;
				that.$forceUpdate();
				that.getList();
			})
		},
		onReachBottom() {
			this.page++;
			this.getList();
		},
		methods: {
			//查看自己的
			viewThis() {
				this.lists = [];
				this.page = 1;
				this.viewThisCode = this.viewThisCode == 0 ? 1 : 0;
				this.getList()
			},
			getList() {
				let that = this;
				that.$api("song.lists", {
					page: that.page,
					limit: 10,
					is_show_only_me: that.viewThisCode
				}).then(res => {
					if (res.code == 1) {
						that.lists = [...that.lists, ...res.data];
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lists {
		margin-top: 20rpx;
		padding: 0rpx 6rpx 0rpx 36rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.items {
		height: 380rpx;
		width: calc(100% / 2 - 30rpx);
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		border-radius: 6rpx 6rpx 6rpx 6rpx;
		opacity: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 30rpx;
		margin-bottom: 30rpx;

		.titleImg {
			margin-top: 40rpx;
			width: 120rpx;
			height: 120rpx;
			overflow: hidden;
			border-radius: 50%;
			box-shadow: inset 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.songBtn {
			width: 170rpx;
			height: 40rpx;
			background: #FF6D93;
			border-radius: 38rpx 38rpx 38rpx 38rpx;
			opacity: 1;
			margin-top: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;
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