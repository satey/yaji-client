<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4">
        <u-navbar :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="center">
                <u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
                </u-tabs>
            </view>
            <view slot="right">
            </view>
        </u-navbar>
        <uc-follow v-for="(item, index) in listUserFollow" :key="index" :item="item"></uc-follow>
        <u-loadmore v-if="listUserFollow.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
        <u-empty v-if="!listUserFollow.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>

        <uc-auth></uc-auth>
    </view>
</template>
<script>
export default {
    name: 'contact',
    components: {
    },
    data() {
        return {
            tablist: [
                { name: '关注', type: 'follow', count: 0 },
                { name: '粉丝', type: 'fans', count: 0 },
                { name: '朋友', type: 'friend', count: 0 },
            ],
            listUserFollow: [],
            params: {
                type: 'follow',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
        }
    },
    onLoad(option) {
        let that = this
        that.getUserFollow()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        that.getUserFollow()
    },
    methods: {
        changeTab(e) {
            // console.log(e)
            let that = this
            that.params.type = e.type
            that.listUserFollow = []
            that.getUserFollow()
        },
        async getUserFollow() {
            let that = this
            that.loadmore = 'loading'
            that.$api('user_follow.lists', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listUserFollow = [...that.listUserFollow, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
