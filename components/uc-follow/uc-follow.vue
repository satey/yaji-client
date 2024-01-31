<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view>
		<view class="flex mt-6" style="display: flex;" v-if="item.realname!=null">
			<view class="mr-4" @click="$u.route('/pages/user/home',{user_id:item.receiver_user_id})"
				v-if="currentIndex==0">
				<!-- <u-avatar size="90" :src=""></u-avatar> -->
				<image :src="item.avatar" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;">
				</image>
			</view>
			<view class="mr-4" @click="$u.route('/pages/user/home',{user_id:item.receiver_user_id})"
				v-if="currentIndex==1">
				<image :src="item.avatar" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;">
				</image>
			</view>
			<view class="mr-4" @click="$u.route('/pages/user/home',{user_id:item.user_id})" v-if="currentIndex==2">
				<image :src="item.avatar" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;">
				</image>
			</view>
			<view
				style="border-bottom: 1rpx solid #ECECEC;flex: 1;display: flex;justify-content: space-between;align-items: center;">
				<view class="flex-1">
					<view class="mt-2">
						<text v-if="item.role_id !=0">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</text>
						<text v-else>无名氏</text>
					</view>
					<view style="margin-top: 10rpx;margin-bottom: 15rpx;color: #999999;font-size: 26rpx;"
						v-if="item.role_id !=0">
						{{ item.achievements}}
					</view>
				</view>
				<view class="ml-4">
					<view v-if="currentIndex==0">
						<!-- 朋友 -->
						<view
							style="width: 136rpx;height: 43rpx;border-radius: 40rpx;text-align: center;line-height: 43rpx;background: #D9D9D9;font-size: 23rpx;color: #FFFFFF;">
							互相关注</view>
					</view>
					<view v-if="currentIndex==1">
						<!-- 关注 -->
						<view @click="follow2(item)"
							style="width: 136rpx;height: 43rpx;border-radius: 40rpx;text-align: center;line-height: 43rpx;background: #D9D9D9;font-size: 23rpx;color: #FFFFFF;">
							已关注</view>
					</view>
					<view v-if="currentIndex==2">
						<!-- 粉丝 -->
						<view v-if="item.is_friend==0" @click="follow(item)"
							style="width: 136rpx;height: 43rpx;border-radius: 40rpx;text-align: center;line-height: 43rpx;background: #FFA000;font-size: 23rpx;color: #FFFFFF;">
							回关</view>
						<view v-if="item.is_friend==1"
							style="width: 136rpx;height: 43rpx;border-radius: 40rpx;text-align: center;line-height: 43rpx;background: #D9D9D9;font-size: 23rpx;color: #FFFFFF;">
							已回关</view>
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
			follow2(item) {
				let that = this;
				let userInfo = uni.getStorageSync("userInfo");
				if (this.item.receiver_user_id == userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "这是您自己，不能操作"
					})
					return;
				}
				that.$api('user_follow.follow', {
					user_id: this.item.receiver_user_id
				}).then(res => {
					if (res.code == 1) {
						that.item.is_friend = !that.item.is_friend ? 1 : 0;
						uni.$emit("followClic");
						console.log("222")
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			follow(item) {
				let that = this;
				let userInfo = uni.getStorageSync("userInfo");
				if (this.item.id == userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "这是您自己，不能操作"
					})
					return;
				}
				that.$api('user_follow.follow', {
					user_id: this.item.user_id
				}).then(res => {
					if (res.code == 1) {
						console.log(res.msg)
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						// that.item.is_friend = !that.item.is_friend ? 1 : 0;
						uni.$emit("followClic");

					}
				})
			},
			openUrl2(item) {
				console.log(item)
			},
			openUrl(item) {
				this.$u.route('/pages/user/home', {
					user_id: item.receiver_user_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>