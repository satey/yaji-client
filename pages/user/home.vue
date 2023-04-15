<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <image class="fixed w-full top-0 left-0 right-0 -z-10" src='@/static/user_background.png' />
        <u-navbar bgColor="transparent">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-white text-4xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
            </view>
        </u-navbar>
        <view class="flex flex-row-right text-white" style="margin: 50rpx 0 150rpx 0; ">
        </view>
        <view class="px-4 py-2 bg-white" style="border-top-left-radius: 20rpx; border-top-right-radius: 20rpx;">
            <view class="flex justify-between">
                <view class="text-center -mt-14" @click="$u.route('/pages/mine/profile')">
                    <image class="block w-24 h-24 rounded-full" :src="user.avatar || '/static/avatar.png'"></image>
                </view>
                <view class="flex w-1/2 justify-between">
                    <view class="text-center">
                        <view class="text-2xl leading-none">{{ userData.follownums || 0 }}</view>
                        <view class="text-sm leading-none text-gray-500 mt-2">关注</view>
                    </view>
                    <view class="text-center">
                        <view class="text-2xl leading-none">{{ userData.fansnums || 0 }}</view>
                        <view class="text-sm leading-none text-gray-500 mt-2">粉丝</view>
                    </view>
                    <view class="text-center">
                        <view class="text-2xl leading-none">{{ userData.diggnums || 0 }}</view>
                        <view class="text-sm leading-none text-gray-500 mt-2">获赞</view>
                    </view>
                </view>
            </view>
            <view class="text-xl font-bold mt-2">
                {{ user.role_realname || '无名氏' }} · {{ user.role_dynasty || '未知朝代' }}
            </view>
            <view class="text-sm leading-none text-gray-500 mt-2">角色名望：{{ user.score || 0 }}</view>
            <view class="text-sm leading-none text-gray-500 mt-2">用户UID：{{ user.id || '********' }}</view>
            <view class="text-sm leading-none text-gray-500 mt-2">
                IP属地：{{ user.region || '未知' }}
            </view>
            <view class="mt-4">{{ user.bio || '暂无介绍' }}</view>
            <view class="flex mt-4">
                <block v-for="(tag, index) in user.tags" :key="index" :item="tag">
                    <view class="border border-solid border-gray-200 p-2 rounded-full text-sm leading-none text-gray-500 mr-2">
                        {{ tag }}
                    </view>
                </block>
            </view>
            <view class="!border-t border-0 border-solid border-gray-200 mt-6 mb-6"></view>
            <u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
            </u-tabs>
            <block v-if="type === 'post'">
                <view class="flex mt-6" v-for="(item, index) in postList" :key="index" :item="item">
                    <view class="mr-6 flex flex-col items-center">
                        <view class="text-3xl font-sans">{{ $u.date(item.createtime, 'd') }}</view>
                        <view class="text-base">{{ $u.date(item.createtime, 'mm月') }}</view>
                    </view>
                    <view class="flex-1">
                        <view class="text-gray-500">{{ $u.date(item.createtime, 'hh:MM') }}</view>
                        <view class="mt-4" @click="$u.route('/pages/post/detail', { post_id: item.id })">{{ item.content }}</view>
                        <view v-if="item.images" class="flex mt-4">
                            <u-album :urls="item.images.split(',')" multipleSize="150" rowCount="3"></u-album>
                        </view>
                        <view class="flex mt-4">
                            <view class="flex items-center border border-solid border-gray-100 p-2 rounded-full mr-2" v-for="(tag, index) in item.tags" :key="index" :item="tag">
                                <i class="ri-hashtag text-base leading-none text-gray-500"></i>
                                <view class="text-sm leading-none text-gray-500">{{ tag }}</view>
                            </view>
                        </view>
                        <view class="flex mt-4">
                            <view class="flex-1 flex items-center">
                                <i class="ri-eye-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                                <text class="text-gray-500 ml-2">{{ item.viewnums }}</text>
                            </view>
                            <view class="flex items-center">
                                <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                                <text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
                            </view>
                            <view class="flex items-center ml-4">
                                <i class="ri-message-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                                <text class="text-gray-500 ml-2">{{ item.commentnums }}</text>
                            </view>
                        </view>
                    </view>
                    <!-- <view class="ml-4"></view> -->
                </view>
                <u-loadmore v-if="postList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
                <u-empty v-if="!postList.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </block>
            <block v-if="type === 'role'">
                <view class="grid grid-cols-12 gap-4 mt-4">
                    <view class="col-span-2 text-gray-500">姓名：</view>
                    <view class="col-span-4">{{ role.realname }}</view>
                    <view class="col-span-2 text-gray-500">拼音：</view>
                    <view class="col-span-4">{{ role.chnname }}</view>
                    <view class="col-span-2 text-gray-500">性别：</view>
                    <view class="col-span-4">{{ role.gender === 0 ? '男' : '女' }}</view>
                    <view class="col-span-2 text-gray-500">朝代：</view>
                    <view class="col-span-4">{{ role.dynasty }}</view>
                    <view class="col-span-2 text-gray-500">生年：</view>
                    <view class="col-span-4">{{ role.birthyear }}</view>
                    <view class="col-span-2 text-gray-500">卒年：</view>
                    <view class="col-span-4">{{ role.deathyear }}</view>
                    <view class="col-span-2 text-gray-500">别称：</view>
                    <view class="col-span-10">{{ role.aliasnames }}</view>
                    <view class="col-span-2 text-gray-500">身份：</view>
                    <view class="col-span-10">
                        <block v-for="(tag, index) in role.titles" :key="index" :item="tag">
                            <text class="mr-4">{{ tag }}</text>
                        </block>
                        <block v-for="(tag, index) in role.achievements" :key="index" :item="tag">
                            <text class="mr-4">{{ tag }}</text>
                        </block>
                    </view>
                    <view class="col-span-2 text-gray-500">简介：</view>
                    <view class="col-span-10">{{ role.content }}</view>
                </view>
            </block>
            <view style="height: 220rpx;"></view>
        </view>

        <view class="grid grid-cols-2 gap-4 p-4 fixed left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white">
            <view class="flex items-center justify-center p-4 rounded-full bg-rose-500" @click="$u.route('pages/chat/single', {user_id: user.id})">
                <i class="ri-message-3-fill text-xl text-white mr-2"></i>
                <text class="text-base text-white">打招呼</text>
            </view>
            <view class="flex items-center justify-center p-4 rounded-full bg-purple-500">
                <i class="ri-heart-3-fill text-xl text-white mr-2"></i>
                <text class="text-base text-white">关注</text>
            </view>
        </view>

        <uc-auth></uc-auth>
    </view>
</template>
<script>
export default {
    name: 'mine',
    components: {
    },
    data() {
        return {
            type: 'post',
            tablist: [
                { name: '动态', type: 'post', count: 0 },
                { name: '角色', type: 'role', count: 0 },
            ],
            user: {},
            role: {},
            userData: {},
            postList: [],
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
        }
    },
    onLoad() {
        let that = this
        that.getUserProfile()
        that.getUserRole()
        that.getUserPost()
        that.getUserData()
    },
    onReachBottom() {
        let that = this
        if (that.loadmore === 'nomore') return false
        that.loadmore = 'loading'
        that.params.page = ++that.params.page
        that.getUserPost()
    },
    methods: {
        changeTab(e) {
            // console.log(e)
            let that = this
            that.type = e.type
        },
        async getUserProfile() {
            let that = this
            that.$api('user.profile', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.user = res.data
                }
            })
        },
        async getUserData() {
            let that = this
            that.$api('user.data', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.userData = res.data
                }
            })
        },
        async getUserRole() {
            let that = this
            that.$api('user.role', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.role = res.data
                }
            })
        },
        async getUserPost() {
            let that = this
            that.loadmore = 'loading'
            that.$api('post.user', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.postList = [...that.postList, ...res.data.data]
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
