<template>
	<view style="background: #f7f7f7;min-height: 100vh;">
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view
			style="border-radius: 5rpx;padding: 27rpx 30rpx 70rpx 30rpx;box-sizing: border-box;background: #fff;margin-top: 25rpx;">
			<view style="color:#333 ;font-size: 28rpx;">话题</view>
			<view style="margin-top: 18rpx;">
				<input type="text" v-model="title" style="color: #333;font-size: 30rpx;" maxlength="16"
					placeholder="请输入话题，限16字" placeholder-style="color:#999,fontSize:30rpx">
			</view>
		</view>
		<view
			style="border-radius: 5rpx;padding: 27rpx 30rpx 70rpx 30rpx;box-sizing: border-box;background: #fff;margin-top: 25rpx;">
			<view style="color:#333 ;font-size: 28rpx;">参与要求（选填）</view>
			<view style="margin-top: 18rpx;">
				<textarea v-model="describe" type="text" style="color: #333;font-size: 30rpx;height: 202rpx;"
					placeholder="雅友们参与话题你有哪些要求吗？" maxlength="60" placeholder-style="color:#666,fontSize:30rpx" />
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: center;margin-top: 50rpx;" @click="release">
			<image src="../../static/fabu2.png" style="width:206rpx ;height: 85rpx;" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				describe: ''
			}
		},
		methods: {
			release() {
				this.$api("post_cate.add", {
					title: this.title,
					desc: this.describe
				}).then(res => {
					console.log(res)
					uni.redirectTo({
						url: `/pages/user/topicspeed?post_cate_id=${res.data.post_cate_id}&is_create_post=${res.data.is_create_post}`
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f7f7f7;
		min-height: 100vh;
	}
</style>