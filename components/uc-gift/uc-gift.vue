<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="flex flex-col items-center rounded-lg text-white text-center bg-white bg-opacity-20">
        <image class="block w-20 h-20" :src="item.gift.image" mode="aspectFill" :lazy-load="true" />
        <view class="text-base leading-none mt-2">{{ item.gift.title }}</view>
        <view class="text-xs leading-none text-fuchsia-500 mt-2">{{ item.gift.price }} 铜币</view>
        <view class="text-base leading-none mt-2 mb-2">x {{ item.nums || 0 }}</view>
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
