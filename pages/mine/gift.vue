<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4">
        <image src='@/static/user_background.png' style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
        <u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-4xl text-white" @click='backPage'></i>
            </view>
            <view slot="center">
                <view class="text-white" @click="skipGifts">我的礼物</view>
            </view>
			<view slot="right">
			    <view class="text-right" style="color: white;" @click="skipGifts">礼物记录</view>
			</view>
        </u-navbar>
        <view class="grid grid-cols-4 gap-4">
            <uc-gift v-for="(item, index) in listUserGift" :key="index" :item="item"></uc-gift>
        </view>
        <u-loadmore v-if="listUserGift.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
        <u-empty v-if="!listUserGift.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>

        <uc-auth></uc-auth>
    </view>
</template>
<script>
export default {
    name: 'gift',
    components: {
    },
    data() {
        return {
            listUserGift: [],
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
        that.getUserGift()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        that.getUserGift()
    },
    methods: {
		backPage(){
			uni.navigateTo({
				url:'/pages/index/mine'
			})
		},
        async getUserGift() {
            let that = this
            that.loadmore = 'loading'
            that.$api('user_gift.lists', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listUserGift = [...that.listUserGift, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
		skipGifts(){
			uni.reLaunch({
				url:'/pages/mine/giftsRecord',
				success: () => {
				console.log('ca');	
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
    }
}
</script>
<style lang="scss" scoped>

</style>
