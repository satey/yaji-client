<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="p-4 h-screen bg-gradient-to-b from-rose-800 to-red-900">
        <view class="flex justify-between">
            <view class="rounded-full bg-black bg-opacity-20 px-5 py-3">
                <view class="leading-none text-white">诗词结缘</view>
                <view class="text-sm leading-none text-white opacity-50 mt-1">交友</view>
            </view>
            <view class="flex flex-row items-center">
                <view class="mr-4">
                    <view class="rounded-full w-10 h-10 flex items-center justify-center bg-black bg-opacity-20">
                        <i class="ri-question-fill text-2xl leading-none text-white opacity-70"></i>
                    </view>
                </view>
                <view class="">
                    <view class="rounded-full w-10 h-10 flex items-center justify-center bg-black bg-opacity-20">
                        <i class="ri-close-fill text-2xl leading-none text-white opacity-70"></i>
                    </view>
                </view>
            </view>
        </view>
        <view class="mt-10">
            <view class="rounded-xl p-6 bg-white bg-opacity-10">
                <view class="text-2xl leading-none text-white mr-5">窈窕淑女，<text class="text-lime-500">君</text>子好逑</view>
                <view class="flex items-center truncate mt-4">
                    <image class="rounded-full w-8 h-8 block mr-2" :src="userInfo.avatar" />
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
        </view>
        <view class="flex mt-6">
            <image class="rounded-full w-6 h-6 block mr-2" :src="userInfo.avatar" />
            <view class="flex-1 mr-5">
                <view class="text-base leading-none text-white">{{ userInfo.role_realname }}</view>
                <view class="text-sm leading-none text-gray-300 mt-2">{{ $u.timeFrom(userInfo.createtime, 'mm月dd日 hh:MM') }}</view>
                <view class="text-white mt-2">路边野花，劝<text class="text-lime-500">君</text>莫采撷。</view>
            </view>
            <view class="flex items-center">
                <i class="ri-heart-3-fill text-xl leading-none text-white"></i>
                <view class="text-sm leading-none text-white ml-1">385</view>
            </view>
        </view>
        <view class="flex mt-6">
            <image class="rounded-full w-6 h-6 block mr-2" :src="userInfo.avatar" />
            <view class="flex-1 mr-5">
                <view class="text-base leading-none text-white">{{ userInfo.role_realname }}</view>
                <view class="text-sm leading-none text-gray-300 mt-2">{{ $u.timeFrom(userInfo.createtime, 'mm月dd日 hh:MM') }}</view>
                <view class="text-white mt-2">路边野花，劝<text class="text-lime-500">君</text>莫采撷。</view>
            </view>
            <view class="flex items-center">
                <i class="ri-heart-3-fill text-xl leading-none text-white"></i>
                <view class="text-sm leading-none text-white ml-1">385</view>
            </view>
        </view>
        <view class="flex mt-6">
            <image class="rounded-full w-6 h-6 block mr-2" :src="userInfo.avatar" />
            <view class="flex-1 mr-5">
                <view class="text-base leading-none text-white">{{ userInfo.role_realname }}</view>
                <view class="text-sm leading-none text-gray-300 mt-2">{{ $u.timeFrom(userInfo.createtime, 'mm月dd日 hh:MM') }}</view>
                <view class="text-white mt-2">路边野花，劝<text class="text-lime-500">君</text>莫采撷。</view>
            </view>
            <view class="flex items-center">
                <i class="ri-heart-3-fill text-xl leading-none text-white"></i>
                <view class="text-sm leading-none text-white ml-1">385</view>
            </view>
        </view>
        <view class="flex mt-6">
            <image class="rounded-full w-6 h-6 block mr-2" :src="userInfo.avatar" />
            <view class="flex-1 mr-5">
                <view class="text-base leading-none text-white">{{ userInfo.role_realname }}</view>
                <view class="text-sm leading-none text-gray-300 mt-2">{{ $u.timeFrom(userInfo.createtime, 'mm月dd日 hh:MM') }}</view>
                <view class="text-white mt-2">路边野花，劝<text class="text-lime-500">君</text>莫采撷。</view>
            </view>
            <view class="flex items-center">
                <i class="ri-heart-3-fill text-xl leading-none text-white"></i>
                <view class="text-sm leading-none text-white ml-1">385</view>
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
            <view class="">
                <view class="rounded-full h-10 flex items-center px-4 bg-white bg-opacity-20">
                    <i class="ri-send-plane-fill text-white mr-1"></i>
                    <view class="text-white text-center">发布诗令</view>
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
