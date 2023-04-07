<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4">
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
                <view slot="suffix" class="py-3 px-4 rounded-full text-sm text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleRecharge()">充值</view>
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
    </view>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'wallet',
    components: {
    },
    data() {
        return {
            recharge: [
                { money: 100, amount: 10 },
                { money: 500, amount: 50 },
                { money: 1000, amount: 100 },
                { money: 2000, amount: 200 },
                { money: 5000, amount: 500 },
                { money: 10000, amount: 1000 },
            ],
            money: 100,
            amount: 10,
            payment: 'wxpay'
        }
    },
    onLoad(option) {
        let that = this
        that.getUserInfo()
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    methods: {
        ...mapActions(['getUserInfo']),
        onCheckMoney(value) {
            let that = this
            if (value < 10) {
                that.money = 10
            }
            if (value > 10000) {
                that.money = 10000
                that.$u.toast('单笔充值不超过10000哦')
            }
            that.amount = that.money / 10
        },
        handleChoose(item) {
            let that = this
            that.money = item.money
            that.amount = item.amount
        },
        handleRecharge() {
            let that = this
            if (!that.money || that.money < 1) {
                that.$u.toast('充值金额填写错误')
                return
            }
            that.$api('user_recharge.apply', {
                amount: that.amount,
            }).then(res => {
                if (res.code === 1) {
                    that.$u.toast('充值成功')
                    that.getUserInfo()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>

</style>
