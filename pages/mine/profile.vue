<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="bg-gray-200">
        <u-navbar title="编辑个人信息" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <view class="py-4 px-4 rounded-full text-base text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleUpdate()">完成</view>
            </view>
        </u-navbar>
        <view class="flex mt-10">
            <image class="block m-auto w-24 h-24 rounded-full" :src="userInfo.avatar || '/static/avatar.png'"></image>
        </view>
        <view class="bg-white mt-10">
            <u-cell-group>
                <u-cell title="昵称" :value="userInfo.nickname" :isLink="true" @click="showNickname = true"></u-cell>
                <u-cell title="出生日期" :value="$u.timeFormat(userInfo.birthday, 'yyyy-mm-dd')" :isLink="true" @click="showBirthday = true"></u-cell>
                <u-cell title="星座" :value="$u.timeFormat(userInfo.birthday, 'yyyy-mm-dd')" :isLink="true" @click="showBirthday = true"></u-cell>
                <u-cell title="个性签名" :value="userInfo.bio" :isLink="true" @click="showBio = true"></u-cell>
            </u-cell-group>
        </view>

        <u-datetime-picker :show="showBirthday" v-model="userInfo.birthday" :confirm="showBirthday = false" mode="date"></u-datetime-picker>

        <u-modal :show="showNickname" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="text-2xl mt-4 text-center">修改昵称</view>
                <view class="mt-6 bg-gray-100 rounded-lg p-2">
                    <u-input maxlength="20" type="text" v-model="userInfo.nickname" :showWordLimit="true"></u-input>
                </view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showNickname = false">取消
                    </view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showNickname = false">确定</view>
                </view>
            </view>
        </u-modal>

        <u-modal :show="showBio" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="text-2xl mt-4 text-center">修改个性签名</view>
                <view class="mt-6 bg-gray-100 rounded-lg p-2">
                    <u-input maxlength="20" type="text" v-model="userInfo.bio" :showWordLimit="true"></u-input>
                </view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showBio = false">取消</view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showBio = false">确定</view>
                </view>
            </view>
        </u-modal>
    </view>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'profile',
    data() {
        return {
            showNickname: false,
            showBirthday: false,
            showBio: false,
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    onLoad(option) {
        let that = this
        that.getUserInfo()
    },
    methods: {
        ...mapActions(['getUserInfo']),
        handleUpdate() {
            let that = this
            that.$api('user.update', {
                nickname: that.userInfo.nickname,
                birthday: that.userInfo.birthday,
                bio: that.userInfo.bio,
            }).then(res => {
                if (res.code === 1) {
                    that.$u.toast('更新成功')
                    that.getUserInfo()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
