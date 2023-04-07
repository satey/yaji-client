<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar :title="data.title" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
        </u-navbar>
        <view class="pt-4">
            <rich-text :nodes="data.content"></rich-text>
        </view>
    </view>
</template>
<script>
export default {
    name: 'page',
    data() {
        return {
            data: ''
        }
    },
    onLoad() {
        let that = this
        that.getRichText()
    },
    methods: {
        getRichText() {
            let that = this
            that.$api('richtext.detail', { id: that.$Route.query.id }).then(res => {
                that.data = res.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
