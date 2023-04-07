<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="px-4">
        <image src='@/static/user_background.png' style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
        <u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
            </view>
        </u-navbar>

        <view v-if="showUserRole">
            <view class="p-4 text-left bg-white bg-opacity-60 mt-4 rounded-2xl" style="height: 600rpx; overflow-y: scroll;">
                <view class="flex flex-direction-row flex-col-bottom">
                    <view class="flex-1 flex items-baseline">
                        <view class="text-xl leading-none mr-4">{{ userRole.realname }}</view>
                        <view>{{ userRole.dynasty }}</view>
                    </view>
                    <view class="text-gray-500 ml-4">名望：{{ userRole.level * 100 }}</view>
                </view>
                <view class="mt-2">
                    <text class="rounded-full text-gray-500 mr-2" v-for="(title, index) in userRole.titles" :key="index" :item="title">{{ title }}</text>
                    <text class="rounded-full text-gray-500 mr-2" v-for="(achievement, index) in userRole.achievements" :key="index" :item="achievement">{{ achievement }}</text>
                </view>
                <view class="mt-4">
                    <view class="">{{ userRole.content || '暂无介绍' }}</view>
                </view>
            </view>
            <view class="grid mt-6 text-center">
                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleReborn()">重新获取 ({{ price }} 铜币)</view>
            </view>
            <view class="flex mt-6">
                <ol class="text-gray-200">
                    <li class="mt-2">每周最多更换一次角色。</li>
                    <li class="mt-2">每个角色都是唯一。</li>
                    <li class="mt-2">若长时间未登录使用，角色可能会被回收。</li>
                </ol>
            </view>
        </view>

        <view v-if="!showUserRole" style="padding: 200rpx 50rpx 20rpx 50rpx;">
            <view class="flex text-left text-2xl text-white">选择角色</view>
            <view class="flex text-left mt-4">
                <text class="text-white opacity-50">选择穿越到的朝代，以便给你创建角色。</text>
            </view>
            <view class="flex flex-col mt-4" style="height: 600rpx; overflow-y: scroll;">
                <view class="flex items-center p-2 rounded-lg mt-4" v-for="(item, index) in listRoleDynasty" :key="index" :item="item" :class="dynasty.id === item.id ? 'bg-white text-rose-500' : 'text-white'" @click="changeDynasty(item)">
                    <view class="flex-1">{{ item.dynasty }}</view>
                    <view class="text-sm opacity-50">{{ $tools.erayear(item.startyear) + ' - ' + $tools.erayear(item.endyear) }}</view>
                </view>
            </view>
            <view class="grid gap-4 mt-10 text-center">
                <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false">取消
                </view>
                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleMatch()">匹配</view>
            </view>
        </view>

        <u-modal :show="showRole" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full text-center">
                <view class="text-4xl font-bold mt-4">获得角色</view>
                <view class="text-left text-gray-500 mt-4">恭喜，你穿越成为了：</view>
                <view class="pt-4 text-left bg-gray-200 mt-4 rounded" style="height: 400rpx; overflow-y: scroll;">
                    <view class="flex flex-direction-row flex-col-bottom">
                        <view class="flex-1"><text class="text-xl mr-4">{{ role.realname }}</text> {{ role.dynasty }}</view>
                        <view class="text-gray-500 ml-4">名望：{{ role.level * 100 }}</view>
                    </view>
                    <view class="mt-4">
                        <text class="border p-2 rounded-full text-gray-500 mr-2" v-for="(title, index) in role.titles" :key="index" :item="title">{{ title }}</text>
                        <text class="border p-2 rounded-full text-gray-500 mr-2" v-for="(achievement, index) in role.achievements" :key="index" :item="achievement">{{ achievement }}</text>
                    </view>
                    <view class="mt-4">
                        <view class="">{{ role.content || '暂无介绍' }}</view>
                    </view>
                </view>
                <view class="text-left text-gray-500 mt-4">你有一个古代身份了，快去交朋友吧。</view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="handleReborn()">重新获取 ({{ price }} 铜币)
                    </view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleSubmit()">开始体验</view>
                </view>
            </view>
        </u-modal>
        <uc-auth></uc-auth>
    </view>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'role',
    components: {
    },
    data() {
        return {
            userRole: {},
            role: {},
            dynasty: {},
            times: 0,
            price: 30,
            listRoleDynasty: [],
            showRole: false,
            showUserRole: true,
        }
    },
    onLoad(option) {
        let that = this
        that.getUserRole()
        that.getRoleDynasty()
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    methods: {
        ...mapActions(['getUserInfo']),
        async getUserRole() {
            let that = this
            that.$api('user.role', { user_id: that.userInfo.id }).then(res => {
                if (res.code === 1) {
                    that.userRole = res.data
                    that.showUserRole = true
                } else {
                    that.showUserRole = false
                }
            })
        },
        async getRoleDynasty() {
            let that = this
            that.$api('role_dynasty.lists').then(res => {
                if (res.code === 1) {
                    that.listRoleDynasty = res.data
                }
            })
        },
        handleReborn() {
            let that = this
            that.times = 1
            that.showUserRole = false
            that.showDynasty = true
        },
        changeDynasty(obj) {
            let that = this
            that.dynasty = obj
        },
        handleMatch() {
            let that = this
            if (!that.dynasy) {
                that.$u.toast('请选择朝代')
                return false
            }
            if (that.times <= 0) {
                that.$u.toast('次数不够了')
                return false
            }
            let data = {
                dynasty: that.dynastydynasty
            }
            that.$api('role.match', data).then(res => {
                if (res.code === 1) {
                    that.role = res.data
                    that.times -= 1
                    that.showRole = true
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        handleSubmit() {
            let that = this
            if (!that.role) {
                that.$u.toast('角色必须选择')
                return false
            }
            let data = {
                role_id: that.role.id
            }
            that.$api('user.bindrole', data).then(rs => {
                if (res.code === 1) {
                    that.$u.route('/pages/index/index')
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
