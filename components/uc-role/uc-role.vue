<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view>
        <view class="flex mt-6">
            <view class="mr-4" @click="$u.route('/pages/user/home', { user_id: item.id })">
                <u-avatar size="90" :src="item.avatar || '/static/avatar.png'"></u-avatar>
            </view>
            <view class="flex-1" @click="$u.route(' /pages/user/home', { user_id: item.id })">
                <view class=" mt-4">{{ item.role_realname + ' · ' + item.role_dynasty || '无名氏' }} </view>
                <view class="text-gray-500 mt-4">{{ $u.timeFrom(item.createtime, 'mm月dd日') }}</view>
                <view class=" mt-4">{{ item.bio }}</view>
                <view class="flex mt-4">
                    <view class="flex items-center border p-2 rounded-full mr-4" v-for="(tag, index) in item.tags" :key="index" :item="tag">
                        <view class="text-gray-500">{{ tag }}</view>
                    </view>
                </view>
            </view>
            <view class="ml-4">
                <view class="border p-2 px-2 rounded-full border-orange-500 text-orange-500 text-sm" @click="$u.route('/pages/user/home', { user_id: item.id })">关注</view>
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
