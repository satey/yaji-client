<template>
	<view class="gift">
		<u-navbar bgColor="#ffffff" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-4xl text-black"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center">
				<view style="display: flex;align-items: center;color: #666;font-size: 36rpx;">
					<view style="margin-right: 25rpx;" @click="tab(0)"
						:style="{color:navbarCurrentIndex==0?'#333333':''}">道具
					</view>
					<view style="margin-left: 25rpx;" @click="tab(1)"
						:style="{color:navbarCurrentIndex==1?'#333333':''}">礼物</view>
				</view>
			</view>
			<view slot="right">
				<view class="text-right" v-if="navbarCurrentIndex==0"
					@click="$u.route('/pages/mine/giftsRecord',{type:'prop'})" style="color: #333333;font-size: 28rpx;">
					道具记录
				</view>
				<view class="text-right" v-if="navbarCurrentIndex==1"
					@click="$u.route('/pages/mine/giftsRecord',{type:'gift'})" style="color: #333333;font-size: 28rpx;">
					礼物记录
				</view>
			</view>
		</u-navbar>
		<view class="lists" v-if="lists.length !=0">
			<block v-if="navbarCurrentIndex==0">
				<view class="items" style="padding: 39rpx 30rpx 39rpx 25rpx;" v-for="(item,index) in lists"
					:key="index">
					<image style="width: 106rpx;height: 115rpx;margin-right: 10rpx;" :src="item.image"
						mode="aspectFill"></image>
					<view style="flex: 1;height: 150rpx;display: flex;flex-direction: column;justify-content: center;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="flex: 1;font-size: 32rpx;color: #666;">{{item.title}}</view>
							<text style="font-size: 36rpx;color: #333;" v-if="item.nums!=0">×{{item.nums}}</text>
						</view>
						<view style="font-size: 26rpx;color: #666;margin-top: 8rpx">{{item.introduction}}123</view>
					</view>
				</view>
			</block>
			<block v-if="navbarCurrentIndex==1">
				<view class="items" v-for="(item,index) in lists" :key="index">
					<image class="listItemImg" :src="item.image" mode="aspectFill"></image>
					<view
						style="flex: 1;height: 150rpx;display: flex;flex-direction: column;justify-content: center;margin-left: 8rpx;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="flex: 1;font-size: 32rpx;color: #666;">{{item.title}}</view>
							<text style="font-size: 36rpx;color: #333;" v-if="item.nums!=0">×{{item.nums}}</text>
						</view>
						<view style="font-size: 26rpx;color: #666;margin-top: 8rpx">{{item.introduction}}</view>
					</view>
				</view>
			</block>
		</view>
		<view v-else style="text-align: center;margin-top: 50rpx;">
			<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1" marginTop="100"></u-empty>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	export default {
		name: 'gift',
		components: {},
		data() {
			return {
				navbarCurrentIndex: 0,
				lists: [],
				page: 1
			}
		},
		onLoad(option) {
			this.getUserPropList()
		},
		// onReachBottom() {
		// 	if (this.navbarCurrentIndex == 1) {
		// 		this.page++;
		// 		this.getUserGift()
		// 	}
		// },
		methods: {
			tab(index) {
				this.navbarCurrentIndex = index;
				this.lists = [];
				this.page = 1;
				if (index == 0) {
					this.getUserPropList()
				} else {
					this.getUserGift()
				}
			},
			//获取礼物列表
			getUserGift() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user_gift.lists').then(res => {
					if (res.code === 1) {
						that.lists.push(...res.data);
					}
				})
			},
			//获取道具列表
			getUserPropList() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user_gift.propList').then(res => {
					if (res.code === 1) {
						console.log(res)
						that.lists.push(...res.data);
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background: #F7F7F7;
		width: 100vw;
		height: 100vh;
	}

	.gift {
		background: #F7F7F7;
		width: 100vw;
		height: 100%;
		min-height: 100vh;
	}

	.lists {
		padding: 50rpx 30rpx;
		box-sizing: border-box;

		.items {
			background: #fff;
			border-radius: 10rpx;
			margin-bottom: 50rpx;
			display: flex;
			align-items: center;
			overflow: hidden;
			padding: 21rpx 30rpx 21rpx 0rpx;
			box-sizing: border-box;

			.listItemImg {
				width: 150rpx;
				height: 150rpx;
			}
		}

	}
</style>