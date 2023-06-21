<template>
	<view class="">
		<u-navbar title="黑名单" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<!-- {{item}} -->
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="blackList" v-if="isB">
			<view class="blackList-item" v-for="(item,index) in blackList">
				<image class="blackList-item-pic" :src="item.avatar" mode=""></image>
				<view class="blackList-item-name">{{item.realname}}.{{item.dynasty}}</view>
				<view class="blackList-item-type">{{item.achievements}}</view>
			</view>

		</view>
		<!-- <u-loadmore v-if="blackList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" /> -->
		<u-empty v-else icon="/static/null.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
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

			this.initBlackList()
		},
		methods: {
			initBlackList() {
				let that = this
				// console.log('that.params',that.params);
				that.$api('user_black.lists', that.params).then(res => {
					if (res.code == 1) {
						console.log('ss', res.data);
						that.blackList = res.data.data
						if (that.blackList) {
							// /此时显示数据为空
							that.isB = true
						}

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