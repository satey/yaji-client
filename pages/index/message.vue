<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4 py-2" :style="`padding-top: ${CustomBar}rpx;`">
        <view class="flex justify-between">
            <u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
            </u-tabs>
            <view class="pt-2">
                <i class="ri-brush-3-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="showRead = true"></i>
            </view>
        </view>
        <uc-message v-for="(item, index) in listMessage" :key="index" :item="item"></uc-message>
        <u-loadmore v-if="listMessage.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
        <u-empty v-if="!listMessage.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>

        <u-modal :show="showRead" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="mt-6">确定清空所有未读消息吗？</view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false">取消</view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="doReadMessage()">确定</view>
                </view>
            </view>
        </u-modal>

        <uc-auth></uc-auth>
        <uc-tabbar></uc-tabbar>
    </view>
</template>
<script>
export default {
    name: 'message',
    components: {
    },
    data() {
        return {
            tablist: [
                { name: '全部', type: 'all', count: 0 },
                { name: '朋友', type: 'friend', count: 0 },
                { name: '粉丝', type: 'fans', count: 0 },
                { name: '系统', type: 'system', count: 0 },
            ],
            listMessage: [],
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
            showRead: false,
        }
    },
    onLoad(option) {
        let that = this
        that.getMessage()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        that.getMessage()
    },
    methods: {
        changeTab(e) {
            // console.log(e)
            let that = this
            that.params.type = e.type
            that.params.page = 1
            that.listMessage = []
            that.getMessage()
        },
        async getMessage() {
            let that = this
            that.loadmore = 'loading'
            that.$api('message.lists', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listMessage = [...that.listMessage, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
        async doReadMessage() {
            let that = this
            that.showRead = false
            that.$api('message.readall').then(res => {
                if (res.code === 1) {
                    that.$u.toast('操作成功')
                    that.listMessage = []
                    that.getMessage()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>

</style>
