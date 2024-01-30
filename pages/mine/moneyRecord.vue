<template>
	<view style="background: #F8F8F8;height: 100vh;">
		<u-navbar title="查看记录" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="tabs">
			<view class="tabItem" @click="currentIndex = 1" style="margin-right: 30rpx;"
				:style="{color:currentIndex==1?'#333':''}">
				<text style="position: relative;z-index: 9;">购买记录</text>
				<view class="line" v-if="currentIndex==1" style="background: #FFA000;"></view>
			</view>
			<view class="tabItem" @click="currentIndex = 2" style="margin-left: 30rpx;"
				:style="{color:currentIndex==2?'#333':''}">
				<text style="position: relative;z-index: 9;">使用记录</text>
				<view class="line" v-if="currentIndex==2" style="background: #9EFF00;"></view>
			</view>
		</view>
		<template v-if="currentIndex==1">
			<view v-if="rechargeList.length!=0">
				<view class="record" v-for="(item,index) in rechargeList" :key="index">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image style="width: 32rpx;height: 32rpx;margin-right: 8rpx;" src="/static/qian.png"
								mode="">
							</image>
							<text style="color:#323232 ;font-size:30rpx ;">x{{item.money}}</text>
						</view>
						<text style="color:#999999 ;font-size:28rpx ;">{{item.remark}}</text>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<text style="color:#999999 ;font-size:26rpx ;margin-top: 10rpx;">{{item.createtime}}</text>
						<text style="color:#323232 ;font-size:32rpx ;margin-top: 10rpx;">￥{{item.pay_money}}</text>
					</view>
				</view>
			</view>
			<view v-else style="text-align: center;margin-top: 50rpx;">
				<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1" marginTop="100"></u-empty>
			</view>
		</template>
		<template v-if="currentIndex==2">
			<view v-if="rechargeList.length!=0">
				<block v-for="(item,index) in rechargeList" :key="index">
					<view class="record" style="display: flex;align-items: center;justify-content: space-between;">
						<view>
							<view style="display: flex;align-items: center;">
								<text style="color:#323232 ;font-size:30rpx ;">{{item.remark}}</text>
							</view>
							<text style="color:#999999 ;font-size:26rpx ;margin-top: 10rpx;">{{item.createtime}}</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<text style="color:#323232 ;font-size:32rpx ;margin-top: 10rpx;">-{{item.money}}</text>
						</view>
					</view>
				</block>
			</view>
			<view v-else style="text-align: center;margin-top: 50rpx;">
				<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1" marginTop="100"></u-empty>
			</view>
		</template>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: "moneyRecord",
		data() {
			return {
				currentIndex: 1,
				page: 1,
				rechargeList: []
			}
		},
		watch: {
			currentIndex: {
				handler(newVal, oldVal) {
					this.page = 1;
					this.rechargeList = [];
					this.getRechargeList(this.currentIndex, this.page)
				},
				immediate: true
			}
		},
		onReachBottom() {
			this.page++;
			this.getRechargeList(this.currentIndex, this.page)
		},
		methods: {
			getRechargeList(type, page) {
				var that = this;
				that.$api("user_recharge.lists", {
					"page": page,
					"money_type": type,
				}).then(res => {
					if (res.code == 1) {
						that.rechargeList.push(...res.data.data)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F8F8F8;
		height: 100vh;
	}

	.tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 50rpx 0rpx;
		background: #fff;

		.tabItem {
			font-size: 32rpx;
			color: #333333;
			position: relative;
			z-index: 9;

			.line {
				height: 16rpx;
				width: 100%;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}

	.record {
		padding: 27rpx 39rpx 26rpx 29rpx;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 1px solid #ECECEC;

		&:last-child {
			border: none;
		}
	}
</style>