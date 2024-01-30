<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar title="充值记录" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
        </u-navbar>
        <uc-bill v-for="(item, index) in listRecharge" :key="index" :item="item"></uc-bill>
        <u-loadmore v-if="listRecharge.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
        <u-empty v-if="!listRecharge.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
    </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'bill',
    components: {
    },
    data() {
        return {
            listRecharge: [],
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
        that.getUserWalletLog()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        that.getUserWalletLog()
    },
    computed: {
        ...mapState({
            initData: state => state.init.initData,
            userInfo: state => state.user.userInfo,
        })
    },
    methods: {
        async getUserWalletLog() {
            let that = this
            that.loadmore = 'loading'
            that.$api('user_recharge.lists', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listRecharge = [...that.listRecharge, ...res.data.data]
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
<style>
page {
    background: #f2f2f2;
}
</style>
