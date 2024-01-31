<template>
	<view class="recoed">
		<u-navbar :title="title" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-4xl text-black"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<block v-if="title =='礼物记录'">
			<view class="giftList" v-if="giftsList.length !=0">
				<view class="giftList_item" v-for="(item,index) in giftsList">
					<view style="display: flex;align-items: center;">
						<view class="giftList_item_time" style="margin-right: 15rpx;">{{item.createtime}}</view>
						<text class="giftList_item_name">{{item.gift.title}}</text>
					</view>
					<block>
						<text class="giftList_item_price">{{item.nums}}</text>
					</block>
				</view>
			</view>
		</block>
		<block v-if="title =='道具记录'">
			<view class="giftList" v-if="giftsList.length !=0">
				<view class="giftList_item" v-for="(item,index) in giftsList">
					<view style="display: flex;align-items: center;">
						<view class="giftList_item_time" style="margin-right: 15rpx;">{{item.create_time}}</view>
						<text class="giftList_item_name">{{item.title}}</text>
					</view>
					<block>
						<text class="giftList_item_price">{{item.nums}}</text>
					</block>
				</view>
			</view>
		</block>
		<view v-if="giftsList.length ==0" style="text-align: center;margin-top: 50rpx;">
			<image style="width: 393rpx;height: 416rpx;" src="@/static/iconImage/jilu.png" mode="aspectFill">
			</image>
		</view>
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: 'giftsRecord',
		data() {
			return {
				giftsList: [],
				title: "",
				page: 1,
				urlPath: ''
			}
		},
		onLoad(e) {
			switch (e.type) {
				case "prop":
					this.title = "道具记录"
					this.urlPath = 'user_gift_log.propLogList'
					this.getList()
					break;
				case "gift":
					this.title = "礼物记录"
					this.urlPath = 'user_gift_log.lists'
					this.getList()
					break;
			}
		},
		onReachBottom() {
			this.page++;
			this.getList();
		},
		methods: {
			getList() {
				var that = this;
				that.$api(`${that.urlPath}`, {
					page: that.page
				}).then(res => {
					if (res.code === 1) {
						if (that.title == '礼物记录') {
							that.giftsList.push(...res.data.data)
						} else {
							that.giftsList.push(...res.data)
							console.log(that.giftsList)
						}
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F8F8F8;
		width: 100vw;
		height: 100vh;
	}

	.recoed {
		background: #F8F8F8;
		width: 100vw;
		height: 100vh;
	}

	.giftList {
		width: 100%;

		.giftList_item {
			padding: 0rpx 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			color: #333333;

			.giftList_item_time {
				box-sizing: border-box;
			}
		}
	}
</style>