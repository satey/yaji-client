<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left" @click="">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <view class="p-2 rounded-full text-sm leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="doPublish()">发布</view>
            </view>
        </u-navbar>

        <view class="rounded-lg p-4 mt-6">
            <u-textarea v-model="form.content" :focus="true" maxlength="500" :count="true" height="300" placeholder="记录此刻想法，分享给有趣的人看…"></u-textarea>
            <view class="flex flex-wrap">
                <view class="flex items-center bg-gray-100 rounded-full p-3 text-orange-500 mr-2 mt-2" v-for="(item, index) in form.tags" :key="index" :item="item" @click="delTag(index)">
                    <i class="ri-hashtag mr-1"></i>
                    <view class="text-sm">{{ item }}</view>
                    <i class="ri-close-line ml-2"></i>
                </view>
            </view>
            <view class="flex flex-wrap" v-if="group.title">
                <view class="flex items-center bg-gray-100 rounded-full p-3 text-orange-500 mr-2 mt-2" @click="delGroup()">
                    <i class="ri-focus-fill mr-2"></i>
                    <view class="text-sm">{{ group.title }}</view>
                    <i class="ri-close-line ml-2"></i>
                </view>
            </view>
            <view class="mt-4" v-if="form.images">
                <u-album :urls="form.images" multipleSize="150" rowCount="3"></u-album>
            </view>
            <view v-if="form.audio" @click="handlePlayAudio()" class="mt-4 flex items-center justify-center rounded w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
                <i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
            </view>
            <view v-if="form.video" @click="handlePlayVideo()" class="mt-4 flex items-center justify-center rounded w-60 h-48 bg-gray-200">
                <i class="ri-play-fill text-2xl text-gray-500" :class="videoStatus ? 'animate-pulse' : ''"></i>
            </view>
            <view class="flex pt-4">
                <view class="flex items-center bg-gray-100 border text-gray-500 p-3 rounded-full mr-2" @click="showTag = true">
                    <i class="ri-hashtag mr-1"></i>
                    <view class="text-sm leading-none">添加话题</view>
                </view>
                <view class="flex items-center bg-gray-100 border text-gray-500 p-3 rounded-full" @click="showGroup = true">
                    <i class="ri-focus-fill mr-2"></i>
                    <view class="text-sm leading-none">添加圈子</view>
                </view>
            </view>
            <view class="flex pt-4">
                <u-checkbox-group>
                    <u-checkbox label="是否私密话题" size="28" shape="circle" inactiveColor="#AAAAAA" activeColor="#FF7043" @change="changeProtocol"></u-checkbox>
                </u-checkbox-group>
            </view>
        </view>

        <view class="border-0 !border-t border-solid border-gray-200 fixed bottom-0 left-0 right-0">
            <view class="flex flex-row-center p-4 bg-white">
                <view class="flex-1 flex">
                    <view class="flex items-center bg-gray-100 p-3 rounded-full mr-4" @click="addImage">
                        <i class="ri-camera-fill text-2xl leading-none text-gray-500"></i>
                    </view>
                    <view class="flex items-center bg-gray-100 p-3 rounded-full mr-4" @click="showRecord = !showRecord">
                        <i class="ri-mic-fill text-2xl leading-none text-gray-500"></i>
                    </view>
                    <view class="flex items-center bg-gray-100 p-3 rounded-full" @click="addVideo">
                        <i class="ri-live-fill text-2xl leading-none text-gray-500"></i>
                    </view>
                </view>
                <view class="flex items-center bg-gray-100 p-3 rounded-full" @click="showPrivacy = true">
                    <i class="ri-eye-fill text-2xl leading-none text-gray-500 mr-2"></i>
                    <view class="text-gray-500">{{ privacyText }}</view>
                </view>
            </view>
            <!-- 语音 -->
            <view class="flex flex-col items-center bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showRecord">
                <view class="text-xs leading-none text-gray-500">{{ recordTip }}</view>
                <view class="flex justify-center items-center mt-16" @touchstart="handleRecordStart" @touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop">
                    <view class="relative flex justify-center items-center rounded-full">
                        <view class="flex justify-center items-center rounded-full w-20 h-20 bg-fuchsia-500 z-10">
                            <i class="ri-mic-fill text-4xl leading-none text-white"></i>
                        </view>
                        <view v-if="recording" class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50">
                            <view class="rounded-full w-20 h-20 p-2 bg-fuchsia-500 opacity-50"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 视频 -->
        <u-popup :show="showVideo" @close="showVideo = false" :closeable="true" mode="center">
            <video id="video" :src="form.video" controls></video>
        </u-popup>
        <!-- 话题 -->
        <u-popup :show="showTag" @close="showTag = false" :closeable="true" :round="30" customStyle="min-height: 500rpx;">
            <view class="p-4">
                <view class="text-2xl text-center">添加话题</view>
                <view class="flex rounded-full bg-gray-100 mt-6">
                    <u-input v-model="tag" placeholder="输入话题" type="text" maxlength="20">
                        <text slot="suffix" class="text-rose-500" @click="addTag(tag)">添加</text>
                    </u-input>
                </view>
                <view class="text-gray-500 mt-6">热门话题</view>
                <view class="flex flex-wrap rounded-full">
                    <view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4" v-for="(item, index) in listHotTag" :key="index" :item="item" @click="addTag(item)">
                        <i class="ri-hashtag mr-1"></i>
                        <view class="text-sm">{{ item }}</view>
                    </view>
                </view>
                <u-empty v-if="!listHotTag.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
                <view class="text-gray-500 mt-6">最新话题</view>
                <view class="flex flex-wrap rounded-full">
                    <view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4" v-for="(item, index) in listNewTag" :key="index" :item="item" @click="addTag(item)">
                        <i class="ri-hashtag mr-1"></i>
                        <view class="text-sm">{{ item }}</view>
                    </view>
                </view>
                <u-empty v-if="!listNewTag.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </view>
        </u-popup>
        <!-- 圈子 -->
        <u-popup :show="showGroup" @close="showGroup = false" :closeable="true" :round="30" customStyle="min-height: 500rpx;">
            <view class="p-4">
                <view class="text-2xl text-center">添加圈子</view>
                <view class="text-gray-500 mt-6">我的圈子</view>
                <view class="flex flex-wrap rounded-full">
                    <view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4" v-for="(item, index) in listMineGroup" :key="index" :item="item" @click="addGroup(item)">
                        <i class="ri-focus-fill mr-2"></i>
                        <view class="text-sm">{{ item.title }}</view>
                    </view>
                </view>
                <u-empty v-if="!listMineGroup.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </view>
        </u-popup>
        <!-- 隐私 -->
        <u-popup :show="showPrivacy" @close="showPrivacy = false" :closeable="true" :round="30" customStyle="min-height: 500rpx;">
            <view class="p-4">
                <view class="text-2xl text-center">隐私设置</view>
                <view class="text-gray-500 mt-6">可见范围</view>
                <view class="flex flex-wrap rounded-full">
                    <u-radio-group v-model="form.privacy" placement="column" @change="onChangePrivacy">
                        <u-radio v-for="(item, index) in listPrivacy" :key="index" :label="item.title" :name="item.type" size="28" shape="circle" inactiveColor="#AAAAAA" activeColor="#FF7043" customStyle="margin: 20rpx 0 0 0;"></u-radio>
                    </u-radio-group>
                </view>
            </view>
        </u-popup>

        <uc-auth></uc-auth>
    </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'add',
    components: {
    },
    data() {
        return {
            form: {
                content: '',
                tags: [],
                images: [],
                audio: '',
                video: '',
                ischat: false,
                privacy: 'all',
            },
            tag: '',
            group: {},
            privacyText: '全部可见',
            listHotTag: ['窈窕淑女君子好逑', '唐风范文', '最爱古诗文', '风雨欲来', '不识庐山真面目'], //
            listNewTag: ['红颜知己', '霸道总裁爱上我', '最爱古诗文', '风雨欲来', '不识庐山真面目'], //
            listMineGroup: [{ id: 1, title: '诗词歌赋' }, { id: 2, title: '思想教育' }, { id: 3, title: '政治文学' }], //
            listPrivacy: [
                { type: 'all', title: '全部可见' },
                { type: 'mine', title: '仅自己可见' },
                { type: 'follow', title: '仅关注可见' }
            ],
            showTag: false,
            showGroup: false,
            showImage: false,
            showRecord: false,
            showPrivacy: false,
            audio: null,
            audioStatus: false,
            video: null,
            videoStatus: false,
            showVideo: false,
            recorder: uni.getRecorderManager(),
            recordTip: "按住说话",
            recording: true,
            recordStoping: false,
            recordTimer: null,
            recordLength: 0,
            point: {
                identifier: 0,
                Y: 0
            },
        }
    },
    onLoad(option) {
        let that = this
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    methods: {
        addTag(item) {
            let that = this
            if (!item) {
                that.$u.toast('话题不能为空')
                return false
            }
            if (that.form.tags.indexOf(item) >= 0 || that.form.tags.length >= 3) {
                return false
            }
            that.form.tags.push(item)
            that.showTag = false
        },
        delTag(index) {
            let that = this
            that.form.tags.splice(index, 1)
        },
        addGroup(item) {
            let that = this
            that.form.groupid = item.id
            that.group = item
            that.showGroup = false
        },
        delGroup() {
            let that = this
            that.form.group_id = 0
            that.group = []
        },
        handlePlayAudio() {
            let that = this
            if (!that.form.audio) {
                that.$u.toast('语音不能为空')
                return false
            }
            if (!that.audio) {
                that.audio = uni.createInnerAudioContext()
                that.audio.src = that.form.audio
            }
            that.audioStatus = !that.audioStatus
            if(that.audioStatus) {
                that.$nextTick(function () {
                    that.audio.play()
                })
            } else {
                that.$nextTick(function () {
                    that.audio.pause()
                })
            }
        },
        handlePlayVideo() {
            let that = this
            if (!that.form.video) {
                that.$u.toast('视频不能为空')
                return false
            }
            if (!that.audio) {
                that.video = uni.createVideoContext('video')
                that.video.src = that.form.video
            }
            that.showVideo = true
            that.$nextTick(function () {
                that.video.play()
            })
        },
        recordStart(e) {
            let that = this
            that.recording = true
            that.recordLength = 0
            that.recordTimer = setInterval(() => {
                that.recordLength++
            }, 1000)
        },
        recordStop(e) {
            let that = this
            clearInterval(that.recordTimer)
            if (!that.recordStoping) {
                that.$request.upfile(e.tempFilePath).then(resf => {
                    that.$u.toast('TODO')
                    // that.$request.http('/Conversation/CreateDetail', {
                    //     ConversationId: that.id,
                    //     OperateType: 5,
                    //     MsgContent: resf.data,
                    //     DurationTime: msg.length
                    // }).then((res) => {
                    //     that.hindlist()
                    //     that.keyword = ''
                    // })
                })
            }
            that.recordStoping = false
        },
        handleRecordStart(e) {
            let that = this
            console.log('touch start')
            if (e.touches.length > 1) {
                // return
            }
            that.point.Y = e.touches[0].clientY
            that.point.identifier = e.touches[0].identifier
            // that.recorder.start({
            //     format: "mp3"
            // })
        },
        handleRecordStop(e) {
            let that = this
            console.log('touch stop')
            if (!that.recording) {
                // return
            }
            that.recording = false
            that.recordTip = '按住说话'
            that.recorder.stop()
        },
        handleRecordDoing(e) {
            let that = this
            console.log('touch move')
            if (!that.recording) {
                // return
            }
            if (that.point.Y - e.touches[0].clientY >= uni.upx2px(100)) {
                that.recordStoping = true
                that.recordTip = '松开手指，取消发送'
            }
        },
        addImage() {
            let that = this
            uni.chooseImage({
                count: 5,
                sizeType: ['original', 'compressed'],
                sourceType: ['album'],
                success: (res) => {
                    res.tempFilePaths.forEach(item => {
                        if (that.form.images.length >= 3) {
                            that.$u.toast('图片不能超过3张')
                            return false
                        }
                        uni.uploadFile({
                            url: that.$API_URL + 'index/upload',
                            filePath: item,
                            name: 'file',
                            success: res => {
                                res = JSON.parse(res.data)
                                // console.log(res)
                                if (res.code === 1) {
                                    that.form.images.push(res.data.fullurl)
                                } else {
                                    that.$u.toast(res.msg)
                                }
                            },
                            complete: e => {}
                        })
                    })
                }
            })
        },
        addVoice() {
            let that = this
            uni.chooseVideo({
                maxDuration: 10,
                sourceType: ['album'],
                success: (res) => {
                    console.log(res)
                    uni.uploadFile({
                        url: that.$API_URL + 'index/upload',
                        filePath: res.tempFilePaths,
                        name: 'file',
                        success: res => {
                            res = JSON.parse(res.data)
                            // console.log(res)
                            if (res.code === 1) {
                                that.form.audio = res.data.fullurl
                            } else {
                                that.$u.toast(res.msg)
                            }
                        },
                        complete: e => {}
                    })
                }
            })
        },
        addVideo() {
            let that = this
            uni.chooseVideo({
                maxDuration: 10,
                sourceType: ['album'],
                success: (res) => {
                    console.log(res)
                    uni.uploadFile({
                        url: that.$API_URL + 'index/upload',
                        filePath: res.tempFilePaths,
                        name: 'file',
                        success: res => {
                            res = JSON.parse(res.data)
                            // console.log(res)
                            if (res.code === 1) {
                                that.form.video = res.data.fullurl
                            } else {
                                that.$u.toast(res.msg)
                            }
                        },
                        complete: e => {}
                    })
                }
            })
        },
        changeProtocol(e) {
            let that = this
            that.form.ischat = e
            console.log(that.form.ischat)
        },
        onChangePrivacy(e) {
            let that = this
            that.form.privacy = e
            that.listPrivacy.forEach(item => {
                if (item.type === e) {
                    that.privacyText = item.title
                    that.showPrivacy = false
                }
            })
        },
        doPublish() {
            let that = this
            if (!that.userInfo.role_id) {
                that.$u.toast('无角色暂不能发布动态')
                return
            }
            if (!that.form.content) {
                that.$u.toast('内容不能为空')
                return
            }
            let data = {
                content: that.form.content,
                images: that.form.images.toString(),
                tags: that.form.tags.toString(),
                audio: that.form.audio,
                video: that.form.video,
                ischat: that.form.ischat,
                privacy: that.form.privacy,
                group_id: that.group.id > 0 ? that.group.id : 0
            }
            that.$api('post.add', data).then(res => {
                if (res.code === 1) {
                    that.form.content = ''
                    that.$u.toast('发布成功')
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