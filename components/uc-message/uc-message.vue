<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view>
        <view v-if="item.type === 'system'" class="flex mt-8" @tap="$u.route('/pages/index/box', { id: item.id })">
            <view class="rounded-full w-8 h-8 p-4 bg-gradient-to-b from-blue-500 to-blue-400 mr-6">
                <i class="ri-alarm-warning-fill text-3xl leading-none text-white"></i>
            </view>
            <view class="flex-1">
                <view class="text-lg leading-none mt-2">{{ item.content }}</view>
                <view class="text-base leading-none text-gray-500 mt-4">{{ $u.timeFrom(item.createtime, 'yyyy年mm月dd日') }}</view>
            </view>
            <view>
                <u-badge v-if="!item.readtime" :isDot="true" bgColor="#FF7043" type="success"></u-badge>
            </view>
        </view>
        <view v-if="item.type === 'friend'" class="flex mt-8" @tap="$u.route('/pages/index/box', { id: item.id })">
            <view class="rounded-full w-8 h-8 p-4 bg-gradient-to-b from-rose-500 to-rose-400 mr-6">
                <i class="ri-heart-pulse-fill text-3xl leading-none text-white"></i>
            </view>
            <view class="flex-1">
                <view class="text-lg leading-none mt-2">{{ item.content }}</view>
                <view class="text-base leading-none text-gray-500 mt-4">{{ $u.timeFrom(item.createtime, 'yyyy年mm月dd日') }}</view>
            </view>
            <view>
                <u-badge v-if="!item.readtime" :isDot="true" bgColor="#FF7043" type="success"></u-badge>
            </view>
        </view>
        <view v-if="item.type === 'fans'" class="flex mt-8" @tap="$u.route('/pages/index/box', { id: item.id })">
            <view class="rounded-full w-8 h-8 p-4 bg-gradient-to-b from-pink-500 to-pink-400 mr-6">
                <i class="ri-user-follow-fill text-3xl text-white"></i>
            </view>
            <view class="flex-1">
                <view class="text-lg leading-none mt-2">{{ item.content }}</view>
                <view class="text-base leading-none text-gray-500 mt-4">{{ $u.timeFrom(item.createtime, 'yyyy年mm月dd日') }}</view>
            </view>
            <view>
                <u-badge v-if="!item.readtime" :isDot="true" bgColor="#FF7043" type="success"></u-badge>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    props: {
        item: {}
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss">

</style>
