<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view>
        <view class="px-4 py-2 bg-gradient-to-b from-red-200 to-white" :style="`padding-top: ${CustomBar}rpx;`">
            <view class="flex justify-between items-center">
                <view class="text-2xl font-bold">雅集</view>
                <view class="">
                    <i class="ri-user-search-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="$u.route('/pages/user/search')"></i>
                </view>
            </view>
            <view class="grid grid-cols-2 gap-4 mt-6">
                <view class="bg-purple-500 p-4 text-white rounded" @click="$u.route('pages/joy/poetry')">
                    <view class="text-xl">曲水流觞</view>
                    <view class="mt-4 opacity-75">美酒助兴畅玩嗨翻天</view>
                </view>
                <view class="bg-red-500 p-4 text-white rounded" @click="$u.route('pages/joy/wine')">
                    <view class="text-xl">诗词结缘</view>
                    <view class="mt-4 opacity-75">美酒助兴畅玩嗨翻天</view>
                </view>
            </view>
        </view>
        <view class="p-4">
            <u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="120rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
            </u-tabs>
            <block v-if="type === 'user'">
                <uc-user v-for="(item, index) in listUserRecommend" :key="index" :item="item"></uc-user>
                <u-loadmore v-if="listUserRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
                <u-empty v-if="!listUserRecommend.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </block>
            <block v-if="type === 'post'">
                <uc-post v-for="(item, index) in listPostRecommend" :key="index" :item="item"></uc-post>
                <u-loadmore v-if="listPostRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
                <u-empty v-if="!listPostRecommend.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </block>
            <block v-if="type === 'group'">
                <uc-group v-for="(item, index) in listGroupRecommend" :key="index" :item="item"></uc-group>
                <u-loadmore v-if="listGroupRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
                <u-empty v-if="!listGroupRecommend.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </block>
        </view>
        <uc-auth></uc-auth>
        <uc-tabbar></uc-tabbar>
    </view>
</template>
<script>
export default {
    name: 'index',
    components: {
    },
    data() {
        return {
            tablist: [
                { name: '今日邂逅', type: 'user', count: 0 },
                { name: '话题速配', type: 'post', count: 0 },
                { name: '今日雅集', type: 'group', count: 0 },
            ],
            type: 'user',
            listUserRecommend: [],
            listPostRecommend: [],
            listGroupRecommend: [],
            params: {
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
        that.getUserRecommend()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        switch (that.type) {
            case 'user':
                that.getUserRecommend()
                break
            case 'post':
                that.getPostRecommend()
                break
            case 'group':
                that.getGroupRecommend()
                break
            default:
                break
        }
    },
    methods: {
        changeTab(e) {
            // console.log(e)
            let that = this
            that.type = e.type
            switch (that.type) {
                case 'user':
                    that.params.page = 1
                    that.listUserRecommend = []
                    that.getUserRecommend()
                    break
                case 'post':
                    that.params.page = 1
                    that.listPostRecommend = []
                    that.getPostRecommend()
                    break
                case 'group':
                    that.params.page = 1
                    that.litGroupRecommend = []
                    that.getGroupRecommend()
                    break
                default:
                    break
            }
        },
        async getUserRecommend() {
            let that = this
            that.loadmore = 'loading'
            that.$api('user.recommend', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listUserRecommend = [...that.listUserRecommend, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
        async getPostRecommend() {
            let that = this
            that.loadmore = 'loading'
            that.$api('post.recommend', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listPostRecommend = [...that.listPostRecommend, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
        async getGroupRecommend() {
            let that = this
            that.loadmore = 'loading'
            that.$api('group.recommend', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listGroupRecommend = [...that.listGroupRecommend, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>

</style>
