<template>

	
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="py-20">
        <image src='@/static/user_background.png' class="fixed w-full h-full top-0 left-0 right-0 -z-10"></image>
        <u-navbar bgColor="transparent">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-4xl text-white" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
        </u-navbar>
        <view class="px-10 py-20">
            <view class="text-2xl text-white">注册登录</view>
            <view class="bg-white p-4 rounded-full mt-8">
                <u-input v-model="form.mobile" :focus="true" placeholder="请输入手机号" type="number" maxlength="11" @input="handleInput('mobile')">
                    <text slot="prefix" class="text-2xl pr-2 mr-4 border-right">+86</text>
                </u-input>
            </view>
            <view class="bg-white p-4 rounded-full mt-8 mb-10">
                <u-input placeholder="请输入验证码" type="number" maxlength="6" v-model="form.code">
                    <text slot="suffix" class="text-rose-500" @click="getSmsCode('mobilelogin')">{{ codeText }}</text>
                </u-input>
            </view>
            <view class="grid mt-8 text-center">
                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="onLogin()">登录</view>
            </view>
            <view class="flex flex-row-right mt-8">
                <text class="text-base leading-none text-white opacity-50" @click="$u.route('/pages/public/page', { id: 4 })">登录遇到问题?</text>
            </view>
            <view class="flex" style="position: absolute; bottom: 100rpx; text-align: center;">
                <u-checkbox-group>
                    <u-checkbox @change="handleAgree" size="28" shape="circle" inactiveColor="#ffffff" activeColor="#ff6897"></u-checkbox>
                </u-checkbox-group>
                <view class="text-base leading-none text-white opacity-50">
                    <text>阅读并同意</text>
                    <text class="ml-2 mr-4" @click="$u.route('/pages/public/page', { id: 1 })">《用户协议》</text>
                    <text>和</text>
                    <text class="ml-2 mr-4" @click="$u.route('/pages/public/page', { id: 2 })">《隐私政策》</text>
                </view>
            </view>
        </view>
		
    </view>

</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'login',
    data() {
        return {
            form: {
                mobile: '',
                code: '',
            },
            codeText: '获取验证码',
            protocol: '',
            isMobileEnd: false,
            disabledCode: false,
			policy:'',//协议内容
			showPopup:false,//控制协议弹窗
			scrollHeight:uni.getSystemInfoSync().windowHeight-130,//协议内容滚动高度
			
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    mounted() { },
    methods: {
		
		
        ...mapActions(['getUserInfo']),
        handleInput(key) {
            let that = this
            that.isMobileEnd = that.$u.test.mobile(that.form.mobile)
        },
        handleAgree(e) {
            let that = this
            that.protocol = e
            console.log(that.protocol)
        },
        getSmsCode(type) {
            let that = this
            if (!that.protocol) {
                that.$u.toast('请同意用户协议')
                return false
            }
            if (!that.isMobileEnd || that.disabledCode) {
                that.$u.toast('请正确填写')
                return false
            }
            let data = {
                mobile: that.form.mobile,
                event: type
            }
            that.$api('sms.send', data).then(res => {
                if (res.code === 1) {
                    if (that.disabledCode) return
                    that.disabledCode = true
                    let n = 10
                    let run = setInterval(() => {
                        n -= 1
                        that.codeText = n + 's后重试'
                        if (n < 0) {
                            clearInterval(run)
                            that.disabledCode = false
                            that.codeText = '重新获取'
                        }
                    }, 1000)
                    that.$u.toast('验证码已发送，请注意查收短信')
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },

        onLogin() {
            let that = this
            if (!that.protocol) {
                that.$u.toast('请同意用户协议')
                return false
            }
            if (!that.isMobileEnd || that.disabledCode || !that.form.code) {
                that.$u.toast('请正确填写信息')
                return false
            }
            let data = {
                mobile: that.form.mobile,
                code: that.form.code
            }
            that.$api('user.smslogin', data).then(res => {
                if (res.code === 1) {
                    uni.setStorageSync('token', res.data.token)
                    that.getUserInfo(res.data.token).then(() => {
                        if (!that.userInfo.role_id) {
                            console.log('no')
                            that.$u.route('/pages/auth/s1')
                        } else {
                            console.log('ok')
                            that.$u.route('/pages/index/index')
                        }
                    })
                    console.log(that.userInfo)
                    if (!that.userInfo.role_id) {
                        console.log('no')
                        that.$u.route('/pages/auth/s1')
                    } else {
                        console.log('ok')
                        that.$u.route('/pages/index/index')
                    }
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
    }
}
</script>
<style>

</style>
