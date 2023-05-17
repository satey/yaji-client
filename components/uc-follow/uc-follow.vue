<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view>
        <view class="flex mt-6">
            <view class="mr-4" @click="$u.route('/pages/user/home', { user_id: item.id })">
                <u-avatar size="90" :src="item.avatar || '/static/avatar.png'"></u-avatar>
            </view>
            <view class="flex-1" @click="$u.route(' /pages/user/home', { user_id: item.id })">
                <view class="mt-2">
                    {{ item.realname + ' · ' + item.dynasty || '无名氏' }}
                </view>
                <view class="mt-4">{{ item.bio }}</view>
            </view>
            <view class="ml-4">
                <view class="border border-solid border-orange-500 p-2 rounded-full text-base leading-none text-orange-500" @click="$u.route('/pages/user/home', { user_id: item.id })">已关注</view>
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
