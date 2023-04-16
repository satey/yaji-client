<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="p-4 h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
        <view class="flex justify-between">
            <view class="rounded-full bg-black bg-opacity-20 px-5 py-3">
                <view class="leading-none text-white">语音直播测试</view>
                <view class="text-base leading-none text-white opacity-50 mt-1">语音交友</view>
            </view>
            <view class="flex flex-row items-center">
                <view class="mr-4">
                    <image class="rounded-full w-10 h-10 block" :src="userInfo.avatar" />
                </view>
                <view class="mr-4">
                    <view class="rounded-full w-10 h-10 flex items-center justify-center bg-black bg-opacity-20">
                        <i class="ri-settings-2-line text-2xl leading-none text-white opacity-70"></i>
                    </view>
                </view>
                <view class="">
                    <view class="rounded-full w-10 h-10 flex items-center justify-center bg-black bg-opacity-20">
                        <i class="ri-close-fill text-2xl leading-none text-white opacity-70"></i>
                    </view>
                </view>
            </view>
        </view>
        <view class="flex justify-between mt-2">
            <view class="rounded-full bg-black bg-opacity-20 px-4 py-3">
                <view class="flex items-center text-white opacity-50">
                    <i class="ri-mic-line leading-none mr-1"></i>
                    <text class="text-base">自由模式</text>
                </view>
            </view>
            <view class="">
            </view>
        </view>
        <view class="grid grid-cols-4 gap-6 mt-4">
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                    <view class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500"></view>
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i>
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <!-- <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <view class="rounded-full w-14 h-14 flex items-center justify-center">
                        <i class="ri-mic-line text-xl leading-none text-white opacity-50"></i>
                    </view>
                </view>
                <view class="flex items-center m-auto mt-1">
                    <text class="text-white opacity-50">我要上麦</text>
                </view>
            </view> -->
        </view>
        <view class="flex mt-4">
            <view class="flex items-center m-auto relative rounded-full bg-black bg-opacity-10 px-10 py-2">
                <i class="ri-user-fill text-base leading-none text-white opacity-50 mr-1"></i>
                <text class="text-base text-white opacity-50 mr-3">6</text>
                <i class="ri-arrow-drop-down-line text-base leading-none text-white opacity-50"></i>
            </view>
        </view>

        <view class="fixed bottom-28 left-0 right-0 p-4 w-9/12">
            <view class="rounded text-cyan-300 bg-black bg-opacity-5 p-1 mt-2">适度健康消费，谨防直播时诱导打赏、脱离平台的交易行为。平台无充值返利活动，请勿轻信他人，避免人身和财产损失。</view>
            <view class="text-white mt-2">
                <i class="ri-vip-crown-2-fill text-pink-500 mr-1"></i>
                <text class="text-yellow-300 mr-3">{{ userInfo.role_realname }}</text>
                <text class="text-white">来了</text>
            </view>
        </view>

        <view class="fixed bottom-0 left-0 right-0 flex p-4">
            <view class="flex-1 mr-4">
                <view class="rounded-full h-10 flex items-center px-4 bg-white bg-opacity-20">
                    <u-input type="text" placeholder="说点什么吧" :clearable="true" customStyle="border: none; background: none; padding: 0;">
                        <i slot="suffix" class="ri-message-3-fill text-base leading-none text-white opacity-70"></i>
                    </u-input>
                </view>
            </view>
            <view class="mr-4">
                <view class="rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-20">
                    <i class="ri-gift-fill text-base leading-none text-white opacity-70"></i>
                </view>
            </view>
            <view class="mr-4">
                <view class="rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-20">
                    <i class="ri-apps-2-fill text-base leading-none text-white opacity-70"></i>
                </view>
            </view>
            <view class="">
                <view class="rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-20">
                    <i class="ri-mic-off-fill text-base leading-none text-white opacity-70"></i>
                </view>
            </view>
        </view>

        <uc-auth></uc-auth>
    </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            showAction: false,
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    onLoad() {
        let that = this
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
