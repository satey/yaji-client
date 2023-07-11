<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<u-navbar title="我的钱包" :safeAreaInsetTop="true" :placeholder="true">
		<view slot="left">
			<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
				@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
		</view>
	</u-navbar>
	<view style="padding: 30rpx 40rpx 30rpx 30rpx;">
		<view class="walletBox">
			<view style="font-size: 26rpx;color: #fff;">钱包余额</view>
			<view style="margin-top: 35rpx;display: flex;align-items: center;">
				<image src="../../static/qian.png" style="width: 60rpx;height: 60rpx;margin-right: 15rpx;" mode="">
				</image>
				<text style="font-size: 56rpx;color: #fff;font-weight: bold;">{{money}}</text>
			</view>
			<view class="purchase" @click="$u.route('/pages/mine/recharge')">充值铜钱</view>
		</view>
	</view>
	<view style="padding: 0rpx 30rpx;">
		<u-tabs :list="tablist" lineColor="#FE4373" lineWidth="120rpx" lineHeight="16rpx" itemStyle="height: 72rpx;"
			inactiveStyle="color: #808080; transform: scale(1);font-weight:normal;transition:all 0.3s;"
			activeStyle="color: #323232 ; font-weight: blod; transform: scale(1.2);transition:all 0.3s;"
			@change="changeTab">
		</u-tabs>
		<view v-show="tabIndex == 0">
			<view style="margin-top: 30rpx;" v-for="(item,index) in rechargeList">
				<view
					style="display: flex;align-items: center;justify-content: space-between;border-bottom: 1rpx solid #ECECEC;padding-bottom: 30rpx;">
					<view>
						<view style="color: #323232;font-size: 30rpx;display: flex;align-items: center;">
							<image src="../../static/qian.png" style="width: 45rpx;height: 45rpx;margin-right: 15rpx;"
								mode="">
							</image>
							<view style="display: flex;align-items: center;">
								<text style="font-size:20rpx;">x</text>
								<view>{{item.money}}</view>
							</view>

						</view>
						<view style="color: #999;font-size: 26rpx;margin-top: 10rpx;">
							{{item.createtime}}
						</view>
					</view>
					<view style="color: #323232;font-size: 36rpx;font-weight: bold;">￥{{item.pay_money}}</view>
				</view>
			</view>
			<u-loadmore v-if="rechargeList.lenth" :loadmoreText="nomoreText" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!rechargeList.length" icon="/static/null3.png" text="暂无记录" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<view v-show="tabIndex == 1">
			<view style="margin-top: 30rpx;" v-for="(item,index) in rechargeList">
				<view
					style="display: flex;align-items: center;justify-content: space-between;border-bottom: 1rpx solid #ECECEC;padding-bottom: 30rpx;">
					<view>
						<view style="color: #323232;font-size: 30rpx;display: flex;align-items: center;">
							<image src="../../static/qian.png" style="width: 45rpx;height: 45rpx;margin-right: 15rpx;"
								mode="">
							</image>
							<view style="display: flex;align-items: center;">
								<view>{{item.remark}}</view>
							</view>

						</view>
						<view style="color: #999;font-size: 26rpx;margin-top: 10rpx;">
							{{item.createtime}}
						</view>
					</view>
					<view style="color: #323232;font-size: 36rpx;font-weight: bold;">-{{item.money}}</view>
				</view>
			</view>
			<u-loadmore v-if="rechargeList.lenth" :loadmoreText="nomoreText" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!rechargeList.length" icon="/static/null3.png" text="暂无记录" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>

	</view>


	<!-- <view class="px-4">
        <u-navbar title="钱包" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-2xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <text @click="$u.route('/pages/mine/bill')" class="text-gray-500">充值记录</text>
            </view>
        </u-navbar>
        <view class="mt-6">
            <view>钱包余额</view>
            <view class="mt-4 text-3xl">
                <text>{{ userInfo.money }}</text>
                <text class="text-base leading-none text-gray-500 ml-2">铜币</text>
            </view>
        </view>
        <view class="mt-6 grid grid-cols-2 gap-4">
            <view v-for="(item, index) in recharge" :key="index" :item="item" @click="handleChoose(item)" class="flex rounded-lg p-4 bg-gray-100">
                <view class="flex-1 text-xl">{{ item.money }}</view>
                <view class="text-gray-400">￥{{ item.amount }}</view>
            </view>
        </view>
        <view class="p-4 rounded-lg mt-4 bg-gray-100">
            <u-input v-model="money" :focus="true" placeholder="输入充值铜币" type="number" maxlength="10" @input="onCheckMoney">
                <view slot="suffix" class="py-3 px-4 rounded-full text-base text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleRecharge()">充值</view>
            </u-input>
        </view>
        <view class="text-base leading-none text-gray-500 mt-4">当前充值 {{ money }} 个铜币，需支付 {{ amount }} 元。</view>
        <view class="flex flex-col justify-between mt-6">
            <view class="flex flex-row items-center mt-4" @click="payment = 'wxpay'">
                <i class="ri-wechat-pay-fill text-3xl leading-none text-green-500 mr-2"></i>
                <view class="flex-1 text-lg leading-none">微信支付</view>
                <view class="text-base leading-none text-rose-500">首单随机立减，最高免单</view>
                <view class="ml-2">
                    <u-radio-group v-model="payment">
                        <u-radio name="wxpay" size="28" shape="circle" inactiveColor="#ff6897" activeColor="#ff6897"></u-radio>
                    </u-radio-group>
                </view>
            </view>
            <view class="flex flex-row items-center mt-4" @click="payment = 'alipay'">
                <i class="ri-alipay-fill text-3xl leading-none text-blue-500 mr-2"></i>
                <view class="flex-1 text-lg leading-none">支付宝</view>
                <view class="text-base leading-none text-rose-500"></view>
                <view class="ml-2">
                    <u-radio-group v-model="payment">
                        <u-radio name="alipay" size="28" shape="circle" inactiveColor="#ff6897" activeColor="#ff6897"></u-radio>
                    </u-radio-group>
                </view>
            </view>
        </view>

        <uc-auth></uc-auth>
    </view> -->
</template>
<script>
	export default {
		name: 'wallet',
		components: {},
		data() {
			return {
				tabIndex: 0,
				money: 0,
				current_page: 1,
				last_page: 0,
				rechargeList: [],
				nomoreText: "加载更多",
				tablist: [{
					name: '购买记录',
					type: 1
				}, {
					name: '使用记录',
					type: 2
				}],
			}
		},
		onShow() {
			this.rechargeList = [];
			this.getUserInfo();
			this.getRechargeList(this.tablist[0].type, this.current_page);
		},
		onReachBottom() {
			if (this.current_page == this.last_page) {
				this.nomoreText = "没有更多了"
				return;
			} else {
				this.current_page++;
				this.getRechargeList(this.current_page)
			}
		},
		methods: {
			//tab切换
			changeTab(e) {
				this.tabIndex = e.index;
				this.current_page = 1;
				this.rechargeList = [];
				this.getRechargeList(e.type, this.current_page);
			},
			//获取用户信息
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.money = res.data.money;
					}
				})
			},
			getRechargeList(type, page) {
				var that = this;
				that.$api("user_recharge.lists", {
					"page": page,
					"money_type": type,
				}).then(res => {
					if (res.code == 1) {
						that.rechargeList.push(...res.data.data)
						that.last_page = res.data.last_page;
						if (that.current_page >= that.last_page) {
							this.nomoreText = "没有更多了"
							return;
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.walletBox {
		height: 298rpx;
		background: url(/static/qianbaoBg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}

	.purchase {
		width: 156rpx;
		height: 62rpx;
		text-align: center;
		line-height: 62rpx;
		color: #FE4373;
		border-radius: 30rpx;
		background: #fff;
		float: right;
	}
</style>