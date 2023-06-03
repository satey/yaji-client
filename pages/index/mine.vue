<template>
    <page-meta :root-font-size="'13px'"></page-meta>
	<!-- ${CustomBar} -->
    <view :style="`padding-top: 50rpx;`">
        <image class="fixed w-full h-screen top-0 left-0 right-0 -z-10" src='@/static/user_background.png' />
        <view class="flex px-4 justify-end text-white" style="margin: 50rpx 0 150rpx 0; ">
            <i @click="$u.route('/pages/mine/contact')" class="ri-user-heart-fill text-3xl mr-6"></i>
            <i @click="$u.route('/pages/mine/setting')" class="ri-settings-fill text-3xl"></i>
        </view>
        <view class="px-4 py-2 bg-white" style="border-top-left-radius: 20rpx; border-top-right-radius: 20rpx;">
            <view class="flex justify-between">
                <view class="text-center -mt-14" @click="$u.route('/pages/mine/profile')">
                    <image class="block w-24 h-24 rounded-full bg-gray-100" :src="userInfo.avatar || '/static/avatar.png'"></image>
                </view>
                <view class="flex w-1/2 justify-between">
                    <view class="text-center">
                        <view class="text-2xl leading-none">{{ userData.follow_count || 0 }}</view>
                        <view class="text-base leading-none text-gray-500 mt-2">关注</view>
                    </view>
                    <view class="text-center">
                        <view class="text-2xl leading-none">{{ userData.fans_count || 0 }}</view>
                        <view class="text-base leading-none text-gray-500 mt-2">粉丝</view>
                    </view>
                    <view class="text-center">
                        <view class="text-2xl leading-none">{{ userData.digg_count || 0 }}</view>
                        <view class="text-base leading-none text-gray-500 mt-2">获赞</view>
                    </view>
                </view>
            </view>
            <view class="text-xl font-bold mt-2">
                {{ userInfo.realname || '无名氏' }} · {{ userInfo.dynasty || '未知朝代' }}
            </view>
		
            <view class="text-base leading-none text-gray-500 mt-2">角色名望：{{ userInfo.score || 0 }}</view>
            <view class="text-base leading-none text-gray-500 mt-2">雅集号：{{ userInfo.uid || '********' }}</view>
            <view class="text-base leading-none text-gray-500 mt-2">
                IP属地：{{ userInfo.province || '未知' }}
                <i @click="showIp = true" class="ri-question-line ml-2 text-gray-500"></i>
            </view>
            <!-- <view class="mt-4">{{ userInfo.bio || '暂无介绍' }}</view> -->
            <view class="flex mt-4">
                <block v-for="(tag, index) in userInfo.tags" :key="index" :item="tag">
                    <view class="border border-solid border-gray-200 p-2 rounded-full text-base leading-none text-gray-500 mr-2">
                        {{ tag }}
                    </view>
                </block>
            </view>
            <view class="grid grid-cols-4 py-6 my-6 border border-gray-100 border-solid border-l-0 border-r-0">
                <view class="text-center" @click="$u.route('/pages/post/add')">
                    <view class="m-auto w-8 h-8 p-4 rounded-full bg-gradient-to-b from-purple-500 to-purple-400">
                        <i class="ri-camera-fill text-white text-3xl leading-none"></i>
                    </view>
                    <view class="text-base leading-none text-gray-500 mt-2">发布动态</view>
                </view>
                <view class="text-center" @click="$u.route('/pages/mine/gift')">
                    <view class="m-auto w-8 h-8 p-4 rounded-full bg-gradient-to-b from-red-500 to-red-400">
                        <i class="ri-gift-fill text-white text-3xl leading-none"></i>
                    </view>
                    <view class="text-base leading-none text-gray-500 mt-2">我的礼物</view>
                </view>
                <!-- <view class="text-center" @click="$u.route('/pages/mine/role')"> -->
				<view class="text-center" @click="skipRole">
                    <view class="m-auto w-8 h-8 p-4 rounded-full bg-gradient-to-b from-blue-500 to-blue-400">
                        <i class="ri-shield-user-fill text-white text-3xl leading-none"></i>
                    </view>
                    <view class="text-base leading-none text-gray-500 mt-2">我的角色</view>
                </view>
               <!-- <view class="text-center" @click="$u.route('/pages/mine/wallet')"> -->
			   <view class="text-center" @click="$u.toast('暂未开放哦')">
                    <view class="m-auto w-8 h-8 p-4 rounded-full bg-gradient-to-b from-pink-500 to-pink-400">
                        <i class="ri-wallet-fill text-white text-3xl leading-none"></i>
                    </view>
                    <view class="text-base leading-none text-gray-500 mt-2">我的钱包</view>
                </view>
            </view>
            <u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
            </u-tabs>
			<uc-mine  v-for="(item, index) in listPostMine" :key="index" :item="item"></uc-mine>
            <u-loadmore v-if="listPostMine.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
            <u-empty v-if="!listPostMine.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
        </view>

        <u-modal :show="showIp" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="text-2xl mt-4 text-center">IP属地说明</view>
                <view class="mt-6">为维护网络安全，保障良好生态和社区的真实性，根据网络运营商数据，展示用户IP属地信息</view>
                <view class="grid gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showIp = false">确定</view>
                </view>
            </view>
        </u-modal>

        <uc-auth></uc-auth>
        <uc-tabbar></uc-tabbar>
    </view>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
    name: 'mine',
    components: {
    },
    data() {
        return {
            tablist: [
                { name: '动态', type: 'post', count: 0 },
            ],
            userData: {},
            listPostMine: [],
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
            showIp: false,
        }
    },
    computed: {
        ...mapState({
            initData: state => state.init.initData,
            userInfo: state => state.user.userInfo,
        })
    },
    onLoad() {
        let that = this
        that.getUserInfo()
        that.getUserData()
        that.getPostMine()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        that.getPostMine()
    },
    onShow() {
    },
    methods: {
        ...mapActions(['getUserInfo']),
		// 跳转角色
		skipRole(){
			uni.navigateTo({
				url:'/pages/mine/role',
			})
			// uni.setStorageSync('user_id',that.userInfo.id)
		},
        changeTab(e) {
            // console.log(e)
            let that = this
        },
        async getUserData() {
            let that = this
            that.$api('user.info', { user_id: that.userInfo.id }).then(res => {
                if (res.code === 1) {
                    that.userData = res.data
                }
            })
        },
        async getPostMine() {
            let that = this
            that.loadmore = 'loading'
            that.$api('post.mine', that.params).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
					// console.log('llll',res.data);
                    that.listPostMine = [...that.listPostMine, ...res.data.data]
                    that.listPostMine.forEach(item => {
                        item.user = that.userInfo
                    })
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
<style>

</style>
