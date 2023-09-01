<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view>
		<view class="flex mt-6" style="display: flex;">
			<view class="mr-4" @click="openUrl(item.receiver_user_id)" v-if="currentIndex==0">
				<!-- <u-avatar size="90" :src=""></u-avatar> -->
				<image :src="item.avatar || '/static/avatar.png'" mode="aspectFill"
					style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
			</view>
			<view class="mr-4" @click="openUrl2( item.user_id)" v-if="currentIndex==1">
				<image :src="item.avatar || '/static/avatar.png'" mode="aspectFill"
					style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
			</view>
			<view class="mr-4" @click="openUrl(item.receiver_user_id)" v-if="currentIndex==2">
				<image :src="item.avatar || '/static/avatar.png'" mode="aspectFill"
					style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
			</view>
			<view
				style="border-bottom: 1rpx solid #ECECEC;flex: 1;display: flex;justify-content: space-between;align-items: center;">
				<view class="flex-1" @click="$u.route(' /pages/user/home', { user_id: item.id })">
					<view class="mt-2">
						<text v-if="item.role_id !=0">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</text>
						<text v-else>无名氏</text>
					</view>
					<view style="margin-top: 10rpx;margin-bottom: 15rpx;color: #999999;font-size: 26rpx;"
						v-if="item.role_id !=0">
						{{ item.achievements.replace(/,/g,"&nbsp;&nbsp;") }}
					</view>
				</view>
				<view class="ml-4">
					<view
						style="background: #CCCCCC;border-radius: 30rpx;color: #fff;font-size: 24rpx;width: 112rpx;height: 42rpx;text-align: center;line-height: 42rpx;"
						@click="$u.route('/pages/user/home', { user_id: item.receiver_user_id })"
						v-if="currentIndex==0">
						已关注
					</view>
					<view v-if="currentIndex==1">
						<view
							style="background: #CCCCCC;border-radius: 30rpx;color: #fff;font-size: 24rpx;width: 100rpx;height: 42rpx;text-align: center;line-height: 42rpx;"
							@click="$u.route('/pages/user/home', { user_id: item.user_id })" v-if="item.is_friend == 1">
							已回关
						</view>
						<view
							style="background: #FE4373;border-radius: 30rpx;color: #fff;font-size: 24rpx;width: 90rpx;height: 42rpx;text-align: center;line-height: 42rpx;"
							@click="$u.route('/pages/user/home', { user_id: item.user_id })" v-if="item.is_friend == 0">
							回关
						</view>
					</view>
					<view
						style="background: #CCCCCC;border-radius: 30rpx;color: #fff;font-size: 24rpx;width: 136rpx;height: 42rpx;text-align: center;line-height: 42rpx;"
						@click="$u.route('/pages/user/home', { user_id: item.receiver_user_id })"
						v-if="currentIndex==2">互相关注
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				currentIndex: 0
			}
		},
		props: {
			item: {},
			tabIndex: 0,
		},
		created() {
			this.currentIndex = this.tabIndex
		},
		methods: {
			openUrl2(id) {
				var userInfo = uni.getStorageSync("userInfo");
				if (id == userInfo.id) {
					this.$u.route('/pages/index/mine')
				} else {
					this.$u.route('/pages/user/home', {
						user_id: id
					})
				}
			},
			openUrl(id) {
				var userInfo = uni.getStorageSync("userInfo");
				if (id == userInfo.id) {
					this.$u.route('/pages/index/mine')
				} else {
					this.$u.route('/pages/user/home', {
						user_id: id
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>