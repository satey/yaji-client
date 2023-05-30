<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4 py-2" :style="`padding-top: 60rpx;`">
        <view class="flex justify-between">
            <u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
            </u-tabs>
            <view class="pt-2">
                <!-- <i class="ri-add-circle-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="$u.route('/pages/post/add')"></i> -->
				<i class="ri-add-circle-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="is_ok()"></i>
            </view>
        </view>
        <block v-if="type === 'recommend'">
            <uc-post v-for="(item, index) in postRecommendList" :key="index" :item="item"></uc-post>
            <u-loadmore v-if="postRecommendList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
            <u-empty v-if="!postRecommendList.length" icon="/static/fly.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
        </block>
        <block v-if="type === 'follow'">
            <uc-post v-for="(item, index) in postFollowList" :key="index" :item="item"></uc-post>
            <u-loadmore v-if="postFollowList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
            <u-empty v-if="!postFollowList.length" icon="/static/fly.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
        </block>

        <!-- <uc-auth></uc-auth>/ -->
        <uc-tabbar></uc-tabbar>
    </view>
</template>
<script>
export default {
    name: 'square',
    components: {
    },
    data() {
        return {
            tablist: [
                { name: '广场', type: 'recommend', count: 0 },
                { name: '关注', type: 'follow', count: 0 },
            ],
            type: 'recommend',
            userList: [],
            postRecommendList: [],
            postFollowList: [],
            params: {
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
			follow_user_id:null
        }
    },
    onLoad(option) {
        let that = this
        that.getPostRecommend()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        switch (that.type) {
            case 'recommend':
                that.getPostRecommend()
                break
            case 'follow':
                that.getPostFollow()
                break
            default:
                break
        }
    },
	onShow() {
		let that=this
	that.getPostRecommend()
	},
	onPullDownRefresh() {
		this.getPostRecommend()
		uni.stopPullDownRefresh()
	
	},
    methods: {
		is_ok(){
			let that=this
			that.$api('post.is_add').then(res => {
				console.log('ii',res);
						    if (res.code === 0) {
								console.log(res.code);
							   that.$u.toast('无角色暂不能发布动态')
							   return
						    } else {
							uni.navigateTo({
								url:'/pages/post/add'
							})
						    }
						})
		},
        changeTab(e) {
            let that = this
            that.type = e.type
            switch (that.type) {
                case 'recommend':
                    that.params.page = 1
                    that.postRecommendList = []
                    that.getPostRecommend()
                    break
                case 'follow':
                    that.params.page = 1
                    that.postFollowList = []
                    that.getPostFollow()
                    break
                default:
                    break
            }
        },
        async getPostRecommend() {
            let that = this
            that.loadmore = 'loading'
            that.$api('post.recommend', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.postRecommendList = [...that.postRecommendList, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
        async getPostFollow() {
            let that = this
            that.loadmore = 'loading'
			let data={
				page:1
			}
		   that.$api('post.follow_user_post_list', data).then(res => {
		       if (res.code === 1) {
				console.log(res.data);
		           that.paginator.total = res.data.total
		           that.paginator.last_page = res.data.last_page
		           that.postFollowList = [...that.postFollowList, ...res.data.data]
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
