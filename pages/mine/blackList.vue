<template>
	<view class="">
		<u-navbar title="黑名单" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<!-- {{item}} -->
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="blackList" style="padding:0 30rpx;" v-if="blackList.length">
			<view style="display: flex;margin-top: 30rpx;" v-for="(item,index) in blackList"
				@click="$u.route('/pages/user/home', { user_id: item.black_user_id })">
				<view>
					<image :src="item.avatar" style="width: 92rpx;height: 92rpx;border-radius: 50%;" mode="aspectFill">
					</image>
				</view>
				<view
					style="flex:1;height: 92rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 20rpx;border-bottom: 1rpx solid #ECECEC;padding-bottom: 30rpx;">
					<view style="font-size: 30rpx;color: #323232;">{{item.realname}}·{{item.dynasty}}</view>
					<view style="font-size: 26rpx;color: #999999;">{{item.achievements}}</view>
				</view>
			</view>

		</view>
		<!-- <u-loadmore v-if="blackList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" /> -->
		<u-empty v-if="blackList.length==0" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
			marginTop="100"></u-empty>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	export default {
		name: 'blackList',
		data() {
			return {
				blackList: [],
				params: {
					page: 1,
					limit: 10
				},
				isB: false
			}
		},
		computed: {

		},
		created() {
			this.initBlackList(this.params)
		},
		onReachBottom() {
			this.params.page += 1
			this.initBlackList(this.params)
		},
		methods: {
			initBlackList(params) {
				let that = this;
				that.$api('user_black.lists', params).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.blackList.push(...res.data);
					} else {
						that.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blackList-item {
		height: 120rpx;
		// border-bottom: 1rpx solid lightgray;
		border-top: 1rpx solid lightgray;
	}

	.blackList-item-pic {

		width: 80rpx;
		height: 80rpx;
		border: 1px solid darkgray;
		float: left;
		margin-top: 25rpx;
		margin-left: 30rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.blackList-item-name {
		position: absolute;
		margin-left: 30rpx;
		top: 20rpx;
		left: 110rpx;
	}

	.blackList-item-type {
		position: absolute;
		margin-left: 30rpx;
		top: 68rpx;
		left: 110rpx;
		color: grey;
		font-size: 28rpx;
	}
</style>