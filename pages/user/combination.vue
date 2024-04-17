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
				style="font-size: 32rpx;color: #333;padding-top: 105rpx;padding-left: 50rpx;font-family: font-test !important;">
				{{titles}}
			</view>
		</view>
		<view style="height: 360rpx;"></view>
		<view class="lists">
			<view class="item" v-for="(item,index) in roleList" :key="index" @click="openUserHome(item)">
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
					<image v-else :src="item.user_avatar" style="width: 88rpx;height: 88rpx;border-radius: 50%;"
						mode="">
					</image>
					<view style="margin-left: 30rpx;flex: 1;margin-right: 10rpx;">
						<view style="font-size: 32rpx;color: #3D3D3D;display: flex;align-items: center;">
							<text>{{item.realname}}·{{item.dynasty}}</text>
							<block v-if="item.gender==1">
								<i class="iconfont icon-nan1"
									style="font-size: 22rpx;color: #00C2FF;margin-left: 15rpx;"></i>
							</block>
							<block v-else>
								<i class="iconfont icon-nv"
									style="font-size: 22rpx;color: #FFA000;margin-left: 15rpx;"></i>
							</block>
						</view>
						<view style="font-size: 25rpx;color: #3D3D3D;opacity: 0.6;margin-top: 10rpx;">
							<block v-for="(item,index) in item.achievements.split(',')" :key="index">
								<text style="margin-right: 15rpx;">{{item}}</text>
							</block>
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;margin-right: 32rpx;" v-if="item.user_id != null">
					<view style="width: 39rpx;height: 39rpx;border-radius: 50%;margin-right: 10rpx;">
						<image :src="item.mw_image" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<text style="font-size: 25rpx; color: #FFA000;">{{item.user_total_mw}}</text>
				</view>
				<view v-else
					style="margin-right: 32rpx;line-height: 46rpx;text-align: center;border-radius: 6rpx;color: #999;font-size: 23rpx;">
					未激活</view>
			</view>
			<u-empty v-if="!roleList.length" icon="/static/iconImage/jilu.png" text="暂无数据" textColor="#a1a1a1"
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
			this.setFontFamily()
		},
		onReachBottom() {
			this.page++;
			this.searchName()
		},
		methods: {
			openUserHome(item) {
				if (item.user_id == null) {
					this.$u.route('/pages/mine/roleDetail', {
						role_id: item.id
					})
					return;
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
			//设置字体
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
			margin-bottom: 25rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 1px solid #FFA000;
			background: linear-gradient(rgba(255, 246, 232, 1), rgba(255, 246, 232, 0));
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
			border: 1px solid #FFA000;
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