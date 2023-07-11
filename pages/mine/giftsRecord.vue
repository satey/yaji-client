<template>
	<view class="">
		<u-navbar title="礼物记录" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="giftList">
			<view class="giftList_item" v-for="(item,index) in giftsList">
				<view style="display: flex;align-items: center;">
					<view class="giftList_item_time">{{item.createtime}}</view>
					<text class="giftList_item_name">{{item.gift.title}}</text>
				</view>
				<text class="giftList_item_price"
					:style="{color:item.nums.indexOf('+')== -1?'':'#FE4373'}">{{item.nums}}</text>
			</view>
			<u-loadmore v-if="giftsList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!giftsList.length" icon="/static/null3.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'giftsRecord',
		data() {
			return {
				giftsList: [],
				params: {
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
			}
		},
		computed: {

		},
		created() {
			let that = this
			that.init()
		},
		onReachBottom() {
			let that = this;
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
			that.getUserGift();
		},
		methods: {
			backPage() {
				uni.navigateTo({
					url: '/pages/mine/gift'
				})
			},
			init() {
				let that = this;
				that.loadmore = 'loading'
				that.$api('user_gift_log.lists').then(res => {
					if (res.code === 1) {
						that.giftsList.push(...res.data.data)
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
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
	.giftList {
		width: 100%;

		.giftList_item {
			padding: 0rpx 30rpx;
			height: 80rpx;
			// border: 1px solid #000;
			font-size: 25rpx;
			color: black;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			color: #323232;

			.giftList_item_time {
				width: 350rpx;
				box-sizing: border-box;
			}
		}
	}
</style>