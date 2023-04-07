<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar title="设置" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <i class="ri-more-fill text-3xl" @click="$u.route('pages/chat/groupsetting')"></i>
            </view>
        </u-navbar>
        <view class=" !border-t border-0 border-solid border-gray-100">
            <view class="py-6 px-4 text-base">基本信息</view>
            <view class="flex justify-between items-center py-6 px-4 bg-white" @click="chooseImage()">
                <view class="text-base leading-none">群聊主图</view>
                <view class="flex-1 text-right">
                    <image class="text-right rounded w-10 h-10" :src="live.image" mode="aspectFill"></image>
                </view>
                <i class="ri-arrow-right-s-line block text-xl leading-none text-gray-500"></i>
            </view>
            <view class="flex justify-between items-center py-6 px-4 bg-white" @click="showName = true">
                <view class="text-base leading-none">群聊名称</view>
                <view class="flex-1 text-right">{{ live.title }}</view>
                <i class="ri-arrow-right-s-line block text-xl leading-none text-gray-500"></i>
            </view>
            <view class="flex justify-between items-center py-6 px-4 bg-white" @click="showIntro = true">
                <view class="text-base leading-none">群聊简介</view>
                <view class="flex-1 text-right">{{ live.Intro }}</view>
                <i class="ri-arrow-right-s-line block text-xl leading-none text-gray-500"></i>
            </view>
        </view>

        <ksp-cropper mode="fixed" :width="720" :height="1280" :maxWidth="720" :maxHeight="1280" :url="imagetemp" @cancel="cancelImage" @ok="uploadImage"></ksp-cropper>
        <u-modal :show="showName" :showConfirmButton="false">
            <view class="w-full">
                <view class="text-xl text-center">修改房间名称</view>
                <view class="mt-8">
                    <view class="bg-gray-100 rounded p-2">
                        <u-input v-model="live.title" type="text" :clearable="true" customStyle="border: none; background: none; padding: 0;"></u-input>
                    </view>
                </view>
                <view class="grid grid-cols-1 gap-6 mt-8 text-center">
                    <view class="flex-auto bg-red-500 text-lg leading-none text-white p-6 rounded-full" @click="submitName()">确定</view>
                </view>
            </view>
        </u-modal>
        <u-modal :show="showIntro" :showConfirmButton="false">
            <view class="w-full">
                <view class="text-xl text-center">修改房间简介</view>
                <view class="mt-8">
                    <view class="bg-gray-100 rounded p-2">
                        <u-textarea v-model="live.Intro" type="text" maxlength="200" :clearable="true" :count="true" customStyle="border: none; background: none; padding: 0;"></u-textarea>
                    </view>
                </view>
                <view class="grid grid-cols-1 gap-6 mt-8 text-center">
                    <view class="flex-auto bg-red-500 text-lg leading-none text-white p-6 rounded-full" @click="submitIntro()">确定</view>
                </view>
            </view>
        </u-modal>
    </view>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            id: 0,
            live: {},
            showName: false,
            showIntro: false,
            showLogo: false,
            imagetemp: '',
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    onLoad(e) {
        let that = this
        that.id = Number(e.id)
        that.getLiveDetail()
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        chooseImage() {
            var that = this
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (rst) => {
                    that.imagetemp = rst.tempFilePaths[0]
                }
            })
        },
        cancelImage() {
            var that = this
            that.imagetemp = ''
        },
        uploadImage(e) {
            var that = this
            that.imagetemp = ''
            that.live.image = e.path
            that.$request.upfile(e.path).then(res => {
                if (res.errorCode === 0) {
                    that.$u.toast('上传成功')
                    that.live.image = res.data
                    that.submitLogo()
                } else {
                    that.$u.toast('上传失败')
                }
            })
        },
        getLiveDetail() {
            let that = this
            that.$request.http('/LiveStream/Get?id=' + that.id).then((res) => {
                that.live = res.data
            })
        },
        submitName() {
            let that = this
            if (!that.live.title) {
                that.$u.toast('房间名称不能为空')
                return
            }
            that.$request.http('/LiveStream/Changetitle', {
                Id: that.id,
                title: that.live.title,
            }).then((res) => {
                if (res.errorCode === 0) {
                    that.showName = false
                    that.$u.toast('设置成功')
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        submitLogo() {
            let that = this
            if (!that.live.image) {
                that.$u.toast('房间图片不能为空')
                return
            }
            that.$request.http('/LiveStream/ChangeLogo', {
                Id: that.id,
                Logo: that.live.image,
            }).then((res) => {
                if (res.errorCode === 0) {
                    that.$u.toast('设置成功')
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        submitIntro() {
            let that = this
            if (!that.live.Intro) {
                that.$u.toast('房间简介不能为空')
                return
            }
            that.$request.http('/LiveStream/ChangeIntro', {
                Id: that.id,
                Intro: that.live.Intro,
            }).then((res) => {
                if (res.errorCode === 0) {
                    that.showIntro = false
                    that.$u.toast('设置成功')
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
    }
}
</script>


<style>
page {
    background: #f2f2f2;
}
</style>
