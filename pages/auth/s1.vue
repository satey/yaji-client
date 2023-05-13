<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <image src='@/static/user_background.png' style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
        <u-navbar bgColor="transparent">
            <view slot="left">
				<!-- 返回箭头 -->
                <!-- <i class="ri-arrow-left-s-line text-4xl text-white" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i> -->
            </view>
        </u-navbar>
        <view style="padding: 250rpx 100rpx;">
            <view class="flex text-left text-xl text-white">欢迎来到雅集</view>
            <view class="flex text-left mt-4">
                <text class="text-white opacity-50 text-base">性别确定后将不可更改，请慎重选择。</text>
            </view>
            <view class="flex justify-around mt-10">
                <view class="flex flex-col items-center" @click="handleChangeGender('male')">
                    <u-avatar size="168" src="/static/avatar-male.png"></u-avatar>
                    <u-radio-group v-model="gender">
                        <u-radio name="male" size="28" shape="circle" customStyle="margin-top: 20rpx;" inactiveColor="#ffffff" activeColor="#ff6897"></u-radio>
                    </u-radio-group>
                </view>
                <view class="flex flex-col items-center" @click="handleChangeGender('female')">
                    <u-avatar size="168" src="/static/avatar-female.png"></u-avatar>
                    <u-radio-group v-model="gender">
                        <u-radio name="female" size="28" shape="circle" customStyle="margin-top: 20rpx;" inactiveColor="#ffffff" activeColor="#ff6897"></u-radio>
                    </u-radio-group>
                </view>
            </view>
            <view class="grid mt-10 text-center">
                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="onSubmit()">
				完成
				</view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: 's1',
    data() {
        return {
            form: {
                birthday: '',
                gender: 0,
            },
            gender: '',
            showBirthday: false,
			ismale:'',
			isFemale:''
        }
    },
    computed: {
    },
    mounted() { },
    methods: {
        handleChangeGender(value) {
            let that = this
            that.gender = value
            that.form.gender = that.gender === 'male' ? 1 : 2
			
        },
        onSubmit() {
            let that = this
			// 如果是男的就等于1
			if (that.gender=='male'){
				that.form.gender=1
			}
			// 如果是女的就等于2
			if (that.gender=='female'){
				that.form.gender=2
			}
			console.log(that.form.gender);
            if (!that.form.gender) {
                that.$u.toast('性别必须选择')
                return false
            }
			let data = {
			    gender: that.form.gender
			}
				that.$api('user.update', data).then(res => {
					// console.log(res.data);
					that.$u.route('/pages/auth/s2')
					if (res.code === 1) {
						that.$u.route('/pages/auth/s2')
					} else {
						that.$u.toast(res.msg)
					}
				})
        },
    }
}
</script>
<style lang="scss" scoped>
.page {
    display: block;
    position: relative;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    overflow: hidden;

    .after-dom {
        content: '';
        display: block;
        position: absolute;
        z-index: 5;
        bottom: -520rpx;
        left: 146rpx;
        width: 1200rpx;
        height: 1200rpx;
        border-radius: 100000rpx;
        opacity: 0.2;
    }

    .title {
        position: relative;
        margin-top: 84rpx;

        .text {
            position: relative;
            z-index: 10;
            padding-left: 112rpx;
            font-size: 60rpx;
            font-weight: bold;
            color: #000000;
            line-height: 66rpx;
        }

        .after {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 246rpx;
            height: 16rpx;
        }
    }

    .input-group-block {
        margin-top: 126rpx;
        padding: 0 110rpx;

        .input-item {
            display: flex;
            padding-top: 46rpx;
            padding-left: 0.2em;
            border-bottom: 1px solid #c2c2c2;

            .input-dom {
                flex: 1;
                font-size: 28rpx;
                height: 70rpx;
                padding-left: 0.2em;
                padding-right: 1em;
            }

            .text {
                font-size: 30rpx;
                color: #2c2c2c;
            }
        }
    }

    .btn-dom {
        margin: 66rpx 56rpx;
        text-align: center !important;
        height: 113rpx;
        line-height: 113rpx !important;
        color: #ffffff;
        border-radius: 1000px !important;
    }

    .zIndex10 {
        position: relative;
        z-index: 10;
    }

    .login-third {
        display: flex;
        align-items: center;
        justify-content: center;

        .weixin-login-btn {
            display: flex;
            flex-direction: column;
            align-items: center;

            .icon-blcok {
                width: 80rpx;
                height: 80rpx;
                background: #28c445;
                border-radius: 1000rpx;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .text {
                font-size: 24rpx;
                color: #848484;
                line-height: 2;
            }
        }
    }

    .reg-block {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 10;
        bottom: 100rpx;
        width: 100vw;

        .description-text {
            font-size: 26rpx;
            color: #686a68;

            .text {
                display: inline-block;
                text-decoration: underline;
            }
        }
    }
}
.active{
	display: none;
}
</style>
