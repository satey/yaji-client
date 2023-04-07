<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="flex bg-white p-4 !border-b border-0 border-solid border-gray-100">
        <view class="flex-1">
            <view class="text-base leading-none">{{ item.remark }}</view>
            <view class="text-sm leading-none text-gray-500 mt-4">{{ $u.timeFrom(item.createtime, 'yyyy年mm月dd日') }}</view>
        </view>
        <view class="flex items-baseline">
            <view class="text-sm leading-none text-rose-500">{{ item.amount }}</view>
            <view class="text-xs leading-none text-gray-500 ml-1">元</view>
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
