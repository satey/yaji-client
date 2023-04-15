<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4">
        <image src='@/static/user_background.png' style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
        <u-navbar bgColor="transparent">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-4xl text-white" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <text class="text-white opacity-50" @click="skip()">跳过</text>
            </view>
        </u-navbar>
        <view style="padding: 200rpx 50rpx 20rpx 50rpx;">
            <view class="flex text-left text-2xl text-white">选择角色</view>
            <view class="flex text-left mt-4">
                <text class="text-white opacity-50">选择穿越到的朝代，以便给你创建角色。</text>
            </view>
            <view class="flex flex-col mt-4" style="height: 600rpx; overflow-y: scroll;">
                <view class="flex items-center p-2 rounded-lg mt-4" v-for="(item, index) in listRoleDynasty" :key="index" :item="item" :class="dynasty.id === item.id ? 'bg-white text-rose-500' : 'text-white'" @click="handleChangeDynasty(item)">
                    <view class="flex-1">{{ item.dynasty }}</view>
                    <view class="text-sm opacity-50">{{ $tools.erayear(item.startyear) + ' - ' + $tools.erayear(item.endyear) }}</view>
                </view>
            </view>
            <view class="grid gap-4 mt-10 text-center">
                <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false">取消
                </view>
                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleMatch()">匹配</view>
            </view>
        </view>

        <u-modal :show="showRole" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full text-center">
                <view class="text-4xl font-bold mt-4">获得角色</view>
                <view class="text-left text-gray-500 mt-4">恭喜，你穿越成为了：</view>
                <view class="p-4 text-left bg-gray-200 mt-4 rounded" style="height: 400rpx; overflow-y: scroll;">
                    <view class="flex flex-direction-row flex-col-bottom">
                        <view class="flex-1"><text class="text-xl mr-4">{{ role.realname }}</text> {{
                            role.dynasty
                        }}</view>
                        <view class="text-gray-500 ml-4">名望：{{ role.level * 100 }}</view>
                    </view>
                    <view class="mt-4">
                        <block v-for="(title, index) in role.titles" :key="index" :item="title">
                            <text class="border p-2 rounded-full text-gray-500 mr-2">{{ title }}</text>
                        </block>
                        <block v-for="(achievement, index) in role.achievements" :key="index" :item="achievement">
                            <text class="border p-2 rounded-full text-gray-500 mr-2">{{ achievement }}</text>
                        </block>
                    </view>
                    <view class="mt-4">
                        <view class="">{{ role.content || '暂无介绍' }}</view>
                    </view>
                </view>
                <view class="text-left text-gray-500 mt-4">你有一个古代身份了，快去交朋友吧。</view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" :disabled="!times" @click="handleRematch()">重新匹配({{ times }})</view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleSubmit()">开始体验</view>
                </view>
            </view>
        </u-modal>
    </view>
</template>
<script>
export default {
    name: 's2',
    data() {
        return {
            form: {
                role_id: 0,
            },
            role: {},
            dynasty: {},
            times: 3,
            listRoleDynasty: [],
            showRole: false,
        }
    },
    onLoad(option) {
        let that = this
        that.getRoleDynasty()
    },
    computed: {
    },
    mounted() { },
    methods: {
        async getRoleDynasty() {
            let that = this
            that.$api('role_dynasty.lists').then(res => {
                if (res.code === 1) {
                    that.listRoleDynasty = res.data
                }
            })
        },
        handleChangeDynasty(obj) {
            let that = this
            that.dynasty = obj
        },
        handleMatch() {
            let that = this
            if (!that.dynasty) {
                that.$u.toast('请选择朝代')
                return false
            }
            if (that.times <= 0) {
                that.$u.toast('重新匹配次数不够了')
                return false
            }
            let data = {
                dynasty: that.dynasty.dynasty
            }
            that.$api('role.match', data).then(res => {
                console.log()
                if (res.code === 1) {
                    that.role = res.data
                    that.times -= 1
                    that.showRole = true
                } else {
                    that.$u.toast(resmsg)
                }
            })
        },
        handleRematch() {
            let that = this
            that.showRole = false
            that.match()
        },
        handleSubmit() {
            let that = this
            if (!that.role) {
                that.$u.toast('角色必须选择')
                return false
            }
            let data = {
                role_id: that.role.id
            }
            that.showRole = false
            that.$api('user.bindrole', data).then(res => {
                if (res.code === 1) {
                    that.$u.route('/pages/index/index')
                } else {
                    that.$u.toast(res.msg)
                    that.$u.route('/pages/index/index')
                }
            })
        },
        skip() {
            let that = this
            that.$u.route('/pages/index/index')
        }
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
</style>
