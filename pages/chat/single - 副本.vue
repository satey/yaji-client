<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar :title="user.role_realname" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <!-- <i class="ri-more-fill text-3xl" @click="$u.route('pages/chat/groupsetting')"></i> -->
            </view>
        </u-navbar>
		<scroll-view class="h-screen" scroll-y="true" scroll-with-animation="true" show-scrollbar="false" :scroll-into-view="scrollInto">
            <view class="text-center text-xs text-gray-500" v-if="!messageList || messageList.length === 0">现在开始留言吧</view>
            <view class="mt-6 px-4" v-for="(item, index) in messageList" :key="index" :item="item">
                <view class="text-center">
                    <text class="p-1 px-2 rounded text-xs leading-none text-gray-400 bg-gray-50">{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM') }}</text>
                </view>
                <view class="flex justify-end mt-6" v-if="item.user.id === userInfo.id">
                    <view class="flex justify-end w-4/6">
                        <view class="mr-3">
                            <view v-if="item.type === 'text'" class="rounded-3xl rounded-tr-none p-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 whitespace-pre-wrap">{{ item.content }}</view>
                            <view v-if="item.type === 'image'">
                                <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
                            </view>
                            <view v-if="item.type === 'gift'">
                                <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
                            </view>
                           <!-- <view v-if="item.type === 'audio'" @click="handlePlayAudio(item.content)" class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
                                <i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
                            </view>
                            <view v-if="item.type === 'video'" @click="handlePlayVideo(item.content)" class="flex items-center justify-center rounded w-60 bg-gray-200">
                                <video class="z-0" :src="item.content" id="video" direction="0" object-fit="fill" page-gesture="true" controls="false"></video>
                            </view> -->
                        </view>
                        <view class="flex">
                            <image class="block rounded-full w-10 h-10" :src="item.user.avatar || '/static/avatar.png'"></image>
                        </view>
                    </view>
                </view>
                <view class="flex justify-start mt-6" v-else>
                    <view class="flex justify-start w-4/6">
                        <view class="flex">
                            <image class="block rounded-full w-10 h-10" :src="item.user.avatar || '/static/avatar.png'"></image>
                        </view>
                        <view class="ml-3">
                            <view v-if="item.type === 'text'" class="rounded-3xl rounded-tl-none p-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 whitespace-pre-wrap">{{ item.content }}</view>
                            <view v-if="item.type === 'image'">
                                <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
                            </view>
                            <view v-if="item.type === 'gift'">
                                <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
                            </view>
                           <view v-if="item.type === 'audio'" @click="handlePlayAudio(item.content)" class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
                                <i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
                            </view>
                             <!--<view v-if="item.type === 'video'" @click="handlePlayVideo(item.content)" class="flex items-center justify-center rounded w-60 bg-gray-200">
                                <video class="z-0" :src="item.content" id="video" direction="0" object-fit="fill" page-gesture="true" controls="false"></video>
                            </view> -->
                        </view>
                    </view>
                </view>
            </view>
			<view class="h-24" id="scrollBottom"></view>
        </scroll-view>

        <view class="fixed bottom-0 left-0 right-0 !border-t border-0 border-solid border-gray-100 bg-white">
            <view class="flex p-4">
                <view class="mr-4 flex items-center" @click="handleVoice">
                    <i class="ri-mic-2-fill block text-4xl leading-none text-gray-400"></i>
                </view>
                <view class="flex-1 mr-4 rounded-full h-10 flex items-center px-4 bg-gray-100">
                    <u-input v-model="text" @confirm="handleTextSend" type="text" placeholder="说点什么吧" :clearable="true" customStyle="border: none; background: none; padding: 0;">
                    </u-input>
                </view>
                <view class="mr-4 flex items-center" @click="handleEmoji">
                    <i class="ri-emotion-fill block text-4xl leading-none text-gray-400"></i>
                </view>
                <view class="flex items-center" v-if="!text" @click="handlePlus">
                    <i class="ri-add-circle-fill text-4xl leading-none text-gray-400"></i>
                </view>
                <view class="flex items-center" v-if="text" @click="handleTextSend">
                    <text class="rounded-full p-2 px-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500">发送</text>
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
            <!-- 表情 -->
            <view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
                <view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item" @click="handleEmojiSend(item)">
                    <text class="text-2xl leading-none">{{ item }}</text>
                </view>
            </view>
            <!-- 礼物 -->
            <view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showGift">
                <view class="flex flex-col items-center" v-for="(item, index) in giftList" :key="index" :item="item" @click="handleGiftSend(item)">
                    <image class="block w-20 h-20" :src="item.image" mode="aspectFill" lazy-load="false"></image>
                    <text class="mt-1">{{ item.title }}</text>
                    <text class="text-xs leading-none text-fuchsia-500 mt-2">{{ item.price }}铜币</text>
                </view>
            </view>
            <!-- 操作 -->
            <view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showPlus">
                <view class="flex flex-col justify-center text-center" @tap="handleImage">
                    <view class="rounded-lg bg-white p-4 mx-auto">
                        <i class="ri-image-fill block text-2xl leading-none text-black"></i>
                    </view>
                    <view class="text-base leading-none mt-2">相册</view>
                </view>
<!--                <view class="flex flex-col justify-center text-center" @tap="handleVideo">
                    <view class="rounded-lg bg-white p-4 mx-auto">
                        <i class="ri-camera-fill block text-2xl leading-none text-black"></i>
                    </view>
                    <view class="text-base leading-none mt-2">拍摄</view>
                </view>
                <view class="flex flex-col justify-center text-center" @tap="handleVideo">
                    <view class="rounded-lg bg-white p-4 mx-auto">
                        <i class="ri-vidicon-fill block text-2xl leading-none text-black"></i>
                    </view>
                    <view class="text-base leading-none mt-2">录制</view>
                </view> -->
                <view class="flex flex-col justify-center text-center" @click="handleGift">
                    <view class="rounded-lg bg-white p-4 mx-auto">
                        <i class="ri-gift-fill block text-2xl leading-none text-black"></i>
                    </view>
                    <view class="text-base leading-none mt-2">礼物</view>
                </view>
            </view>
        </view>

        <view v-if="showSvga" id="svgaPlayer" class="fixed w-full h-screen top-0 right-0 bottom-0 left-0">
            <l-svga ref="svgaPlayer"></l-svga>
        </view>
        <uc-auth></uc-auth>
    </view>
</template>
<script>
import { mapState } from 'vuex'
import Socket from '@/common/chat.js'
export default {
    name: 'mine',
    components: {
    },
    data() {
        return {
            chat: {},
            user: {},
            socket: null,
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
			scrollInto: '',
            loadmore: false,
            text: '',
            messageList: [],
            showEmoji: false,
            emojiList: [],
            giftList: [],
            showSvga: false,
            showPlus: false,
            showImage: false,
            showCamera: false,
            showRecord: false,
            showGift: false,
            audio: null,
            audioStatus: false,
            video: null,
            videoStatus: false,
            recorder: uni.getRecorderManager(),
            recording: false,
            recordStoping: false,
            recordTip: "按住说话",
            recordTimer: null,
            recordLength: 0,
            recordPoint: {
                identifier: 0,
                Y: 0
            },
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
	created() {
        let that = this
        that.getUserProfile()
        that.getEmojiList()
        that.getGiftList()
	},
    onLoad() {
        let that = this
        that.init()
    },
    beforeDestroy() {
        let that = this
        if (that.socket) {
            that.socket.close()
        }
    },
    methods: {
        init() {
            let that = this
            that.$api('chat.single', {
                user_id: that.$Route.query.user_id
            }).then(res => {
                if (res.code === 1) {
					console.log('init',res.data);
                    that.chat = res.data
                    uni.setStorageSync('CHATSESSIONID', res.data.session_id)
                    // 监听消息
                    that.socket = new Socket((msg) => {
                        that.parseMsg(msg.data)
                    });
                    // 监听录音
                    that.recorder.onStart((e) => {
                        that.recordStart(e)
                    })
                    that.recorder.onStop((e) => {
                        that.recordStop(e)
                    })
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        changeTab(e) {
            let that = this
            that.type = e.type
        },
		scrollBottom() {
            let that = this
			let timeout = null
			that.scrollInto = ''
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				that.scrollInto = 'scrollBottom'
			}, 300)
		},
        // 解析消息
        parseMsg(message) {
            console.log(message)
            let that = this
            let msg = JSON.parse(message)
            if (msg.code === 1) {
                switch (msg.type) {
                    case 'init':
                        that.sendMessage('', 'history')
                        that.scrollBottom()
                        break
                    case 'text':
                        that.messageList.push(msg.data)
                        that.scrollBottom()
                        break
                    case 'image':
                        that.messageList.push(msg.data)
                        that.scrollBottom()
                        break
                    case 'audio':
                        that.messageList.push(msg.data)
                        that.scrollBottom()
                        break
                    case 'video':
                        that.messageList.push(msg.data)
                        that.scrollBottom()
                        break
                    case 'history':
                        that.messageList = msg.data.data
                        that.messageList.sort((a, b) => { return a.id - b.id })
                        break
                    default:
                }
            } else {
                that.$u.toast('连接错误：' + msg.msg)
            }
        },
        // 获取历史聊天记录
        async getMessageList() {
            let that = this
            let params = {
                type: 'history',
                msg: 'send',
                data: ''
            }
            let res = await that.socket.send(JSON.stringify(params))
        },
        // 发送服务数据
        async sendMessage(data, type = 'text') {
            let that = this
            let params = {
                type: type,
                msg: 'send',
                data: data
            }
            let res = await that.socket.send(JSON.stringify(params))
        },
        handleTextSend() {
            let that = this
            if (that.text === '') {
                return
            }
            that.sendMessage(that.text, 'text')
            that.showEmoji = false
            that.text = ''
        },
        handleEmoji() {
            let that = this
            that.showEmoji = !that.showEmoji
            that.showRecord = false
            that.showPlus = false
            that.showGift = false
        },
        handleVoice() {
            let that = this
            that.showRecord = !that.showRecord
            that.showEmoji = false
            that.showPlus = false
            that.showGift = false
        },
        handlePlus() {
            let that = this
            that.showPlus = !that.showPlus
            that.showRecord = false
            that.showEmoji = false
            that.showGift = false
        },
        handleEmojiSend(item) {
            let that = this
            that.text += item
        },
        handleGift() {
            let that = this
            that.showGift = !that.showGift
            that.showPlus = false
        },
        handleGiftSend(item) {
            let that = this
            that.gift = item
            if (that.userInfo.money < that.gift.price) {
                // that.$api.msg('账户铜币不足')
				that.$u.toast('账户铜币不足')
                return
            }
            that.sendMessage(that.gift.image, 'gift')
            that.showGift = false
            that.handleGiftPlay()
			// that.handleTextSend()
			// 强制刷新
				setTimeout(() => {
					this.$router.go(0)
				}, 10)
        },
        handleGiftPlay() {
            let that = this
            that.showSvga = true
            that.$nextTick(() => {
                that.$refs.svgaPlayer.render(async (parser, player) => {
                    let videoItem = await parser.load(that.gift.url)
                    await player.setVideoItem(videoItem)
                    player.loops = 1
                    player.startAnimation()
                    player.onFinished(() => {
                        that.showSvga = false
                    })
                })
            })
        },
        async getUserProfile() {
            let that = this
            that.$api('user.profile', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.user = res.data
                }
            })
        },
        async getEmojiList() {
            let that = this
            if (uni.getStorageSync('EMOJILIST')) {
                that.emojiList = uni.getStorageSync('EMOJILIST')
            } else {
                that.emojiList = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','🥲','😚','🙂','🤗','🤩','🤔','🫡','🤨','😐','😑','😶','🫥','😶‍🌫️','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🫤','🙃','🫠','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😮‍💨','😰','😱','🥵','🥶','😳','🤪','😵','😵‍💫','🥴','😠','😡','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳','🥸','🥺','🥹','🤠','🤡','🤥','🤫','🤭','🫢','🫣','🧐','🤓','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖','💩','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','🐵','🐶','🐺','🐱','🦁','🐯','🦒','🦊','🦝','🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐻‍❄️','🐨','🐼','🐸','🦓','🐴','🦄','🐔','🐲','🐽','🐾','🐒','🦍','🦧','🦮','🐕‍🦺','🐩','🐕','🐈','🐈‍⬛','🐅','🐆','🐎','🦌','🦬','🦏','🦛','🐂','🐃','🐄','🐖','🐏','🐑','🐐','🐪','🐫','🦙','🦘','🦥','🦨','🦡','🐘','🦣','🐁','🐀','🦔','🐇','🐿️','🦫','🦎','🐊','🐢','🐍','🐉','🦕','🦖','🦦','🦈','🐬','🦭','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦞','🦀','🐚','🪸','🦆','🐓','🦃','🦅','🕊️','🦢','🦜','🦩','🦚','🦉','🦤','🪶','🐦','🐧','🐥','🐤','🐣','🦇','🦋','🐌','🐛','🦟','🪰','🪱','🦗','🐜','🪳','🐝','🪲','🐞','🦂','🕷️','🕸️','🦠','🧞‍♀️','🧞‍♂️','🧞','🧟‍♀️','🧟‍♂️','🧟','🧌','🗣️','👤','👥','🫂','👁️','👀','🦴','🦷','👅','👄','🫦','🧠','🫀','🫁','🦾','🦿','👣','🤺','⛷️']
                uni.setStorageSync('EMOJILIST', that.emojiList)

            }
        },
        async getGiftList() {
            let that = this
            if (uni.getStorageSync('GIFTLIST')) {
                that.giftList = uni.getStorageSync('GIFTLIST')
            } else {
                that.$api('gift.lists').then(res => {
					console.log(res.data);
                    if (res.code === 1) {
                        that.giftList = res.data.data
                        uni.setStorageSync('GIFTLIST', that.giftList)
                    }
                })
            }
        },
        handlePlayAudio(audio) {
            let that = this
            if (!audio) {
                that.$u.toast('语音不能为空')
                return false
            }
            if (!that.audio) {
                that.audio = uni.createInnerAudioContext()
                that.audio.src = audio
            }
            that.audioStatus = !that.audioStatus
            if(that.audioStatus) {
                that.$nextTick(function () {
                    that.audio.play()
                    that.audio.onEnded((e) => {
                        that.audioStatus = false
                    })
                })
            } else {
                that.$nextTick(function () {
                    that.audio.pause()
                })
            }
        },
        // handlePlayVideo(video) {
        //     let that = this
        //     if (!video) {
        //         that.$u.toast('视频不能为空')
        //         return false
        //     }
        //     if (!that.video) {
        //         that.video = uni.createVideoContext('video')
        //         that.video.src = video
        //     }
        //     that.videoStatus = !that.videoStatus
        //     if(that.videoStatus) {
        //         that.$nextTick(function () {
        //             that.video.play()
        //         })
        //     } else {
        //         that.$nextTick(function () {
        //             that.video.pause()
        //         })
        //     }
        // },
        handleRecordStart(e) {
            let that = this
            console.log('touch start')
            if (e.touches.length > 1) {
                return
            }
            that.recording = true
            that.recordStoping = false
            that.recordTip = '正在录制…'
            that.recordPoint.Y = e.touches[0].clientY
            that.recordPoint.identifier = e.touches[0].identifier
            that.recorder.start({
                format: "mp3"
            })
        },
        handleRecordStop(e) {
            let that = this
            console.log('touch stop')
            if (!that.recording) {
                return
            }
            that.recording = false
            that.recordTip = '按住说话'
            that.recorder.stop()
        },
        handleRecordDoing(e) {
            let that = this
            console.log('touch move')
            if (that.recordPoint.Y - e.touches[0].clientY >= uni.upx2px(100)) {
                that.recordStoping = true
                that.recordTip = '松开手指，取消发送'
            }
        },
        recordStart(e) {
            let that = this
			console.log('recorder start' + JSON.stringify(e));
            that.recordLength = 0
            that.recordTimer = setInterval(() => {
                that.recordLength++
            }, 1000)
		},
        recordStop(e) {
            let that = this
			console.log('recorder stop' + JSON.stringify(e))
            that.recording = false
            clearInterval(that.recordTimer)
            uni.uploadFile({
                url: that.$API_URL + 'index/upload',
                filePath: e.tempFilePath,
                name: 'file',
                success: res => {
                    res = JSON.parse(res.data)
                    if (res.code === 1) {
                        that.sendMessage(res.data.fullurl, 'audio')
                    } else {
                        that.$u.toast(res.msg)
                    }
                },
                complete: e => {}
            })
		},
        handleImage() {
            let that = this
            uni.chooseImage({
                count: 3,
                sizeType: ['original', 'compressed'],
                sourceType: ['album'],
                success: (res) => {
                    res.tempFilePaths.forEach(item => {
                        uni.uploadFile({
                            url: that.$API_URL + 'index/upload',
                            filePath: item,
                            name: 'file',
                            success: res => {
                                res = JSON.parse(res.data)
                                if (res.code === 1) {
                                    that.sendMessage(res.data.fullurl, 'image')
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
        // handleVideo() {
        //     let that = this
        //     uni.chooseVideo({
        //         maxDuration: 10,
        //         sourceType: ['album'],
        //         success: (res) => {
        //             console.log(res)
        //             if (res.size > 10 * 1024 * 1024) {
        //                 that.$u.toast('视频不能超过10M')
        //                 return false
        //             }
        //             uni.uploadFile({
        //                 url: that.$API_URL + 'index/upload',
        //                 filePath: res.tempFilePath,
        //                 name: 'file',
        //                 success: res => {
        //                     res = JSON.parse(res.data)
        //                     console.log(res)
        //                     if (res.code === 1) {
        //                         that.sendMessage(res.data.fullurl, 'video')
        //                     } else {
        //                         that.$u.toast(res.msg)
        //                     }
        //                 },
        //                 complete: e => {}
        //             })
        //         }
        //     })
        // },
    }
}
</script>
<style lang="scss" scoped>

</style>

















// <!-- <template>
//     <page-meta :root-font-size="'13px'"></page-meta>
//     <view class="">
//         <u-navbar :title="user.role_realname" :safeAreaInsetTop="true" :placeholder="true">
//             <view slot="left">
//                 <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
//             </view>
//             <view slot="right">
// 			<view style="font-size: 50rpx; margin-top: -40rpx;"  @click="$u.route('pages/chat/joinBlackList')">...</view>
//                 <!-- <i class="ri-more-fill text-3xl" @click="$u.route('pages/chat/groupsetting')"></i> -->
//             </view>
//         </u-navbar>
        
// 		<scroll-view class="h-screen" scroll-y="true" scroll-with-animation="true" show-scrollbar="false" :scroll-into-view="scrollInto">
//             <view class="text-center text-xs text-gray-500" v-if="!messageList || messageList.length === 0">现在开始留言吧</view>
//             <view class="mt-6 px-4" v-for="(item, index) in messageList" :key="index" :item="item">
//                 <view class="text-center">
//                     <text class="p-1 px-2 rounded text-xs leading-none text-gray-400 bg-gray-50">{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM') }}</text>
//                 </view>
//                 <view class="flex justify-end mt-6" v-if="item.user.id === userInfo.id">
//                     <view class="flex justify-end w-4/6">
//                         <view class="mr-3">
//                             <view v-if="item.type === 'text'" class="rounded-3xl rounded-tr-none p-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 whitespace-pre-wrap">{{ item.content }}</view>
//                             <view v-if="item.type === 'image'">
//                                 <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
//                             </view>
//                             <view v-if="item.type === 'gift'">
//                                 <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
//                             </view>
//                            <!-- <view v-if="item.type === 'audio'" @click="handlePlayAudio(item.content)" class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
//                                 <i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
//                             </view>
//                             <view v-if="item.type === 'video'" @click="handlePlayVideo(item.content)" class="flex items-center justify-center rounded w-60 bg-gray-200">
//                                 <video class="z-0" :src="item.content" id="video" direction="0" object-fit="fill" page-gesture="true" controls="false"></video>
//                             </view> -->
//                         </view>
//                         <view class="flex">
//                             <image class="block rounded-full w-10 h-10" :src="item.user.avatar || '/static/avatar.png'"></image>
//                         </view>
//                     </view>
//                 </view>
//                 <view class="flex justify-start mt-6" v-else>
//                     <view class="flex justify-start w-4/6">
//                         <view class="flex">
//                             <image class="block rounded-full w-10 h-10" :src="item.user.avatar || '/static/avatar.png'"></image>
//                         </view>
//                         <view class="ml-3">
//                             <view v-if="item.type === 'text'" class="rounded-3xl rounded-tl-none p-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 whitespace-pre-wrap">{{ item.content }}</view>
//                             <view v-if="item.type === 'image'">
//                                 <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
//                             </view>
//                             <view v-if="item.type === 'gift'">
//                                 <u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
//                             </view>
//                            <view v-if="item.type === 'audio'" @click="handlePlayAudio(item.content)" class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
//                                 <i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
//                             </view>
//                              <!--<view v-if="item.type === 'video'" @click="handlePlayVideo(item.content)" class="flex items-center justify-center rounded w-60 bg-gray-200">
//                                 <video class="z-0" :src="item.content" id="video" direction="0" object-fit="fill" page-gesture="true" controls="false"></video>
//                             </view> -->
//                         </view>
//                     </view>
//                 </view>
//             </view>
// 			<view class="h-24" id="scrollBottom"></view>
//         </scroll-view>

//         <view class="fixed bottom-0 left-0 right-0 !border-t border-0 border-solid border-gray-100 bg-white">
//             <view class="flex p-4">
//                 <view class="mr-4 flex items-center" @click="handleVoice">
//                     <i class="ri-mic-2-fill block text-4xl leading-none text-gray-400"></i>
//                 </view>
//                 <view class="flex-1 mr-4 rounded-full h-10 flex items-center px-4 bg-gray-100">
//                     <u-input v-model="text" @confirm="handleTextSend" type="text" placeholder="说点什么吧" :clearable="true" customStyle="border: none; background: none; padding: 0;">
//                     </u-input>
//                 </view>
//                 <view class="mr-4 flex items-center" @click="handleEmoji">
//                     <i class="ri-emotion-fill block text-4xl leading-none text-gray-400"></i>
//                 </view>
//                 <view class="flex items-center" v-if="!text" @click="handlePlus">
//                     <i class="ri-add-circle-fill text-4xl leading-none text-gray-400"></i>
//                 </view>
//                 <view class="flex items-center" v-if="text" @click="handleTextSend">
//                     <text class="rounded-full p-2 px-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500">发送</text>
//                 </view>
//             </view>
//             <!-- 语音 -->
//             <view class="flex flex-col items-center bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showRecord">
//                 <view class="text-xs leading-none text-gray-500">{{ recordTip }}</view>
//                 <view class="flex justify-center items-center mt-16" @touchstart="voiceBeginH5" @touchmove.stop.prevent="voiceIng" @touchend="voiceEndH5"
// 						@touchcancel="voiceCancelH5">
//                     <view class="relative flex justify-center items-center rounded-full">
//                         <view class="flex justify-center items-center rounded-full w-20 h-20 bg-fuchsia-500 z-10">
//                             <i class="ri-mic-fill text-4xl leading-none text-white"></i>
//                         </view>
//                         <view v-if="recording" class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50">
//                             <view class="rounded-full w-20 h-20 p-2 bg-fuchsia-500 opacity-50"></view>
//                         </view>
//                     </view>
//                 </view>
//             </view>
//             <!-- 表情 -->
//             <view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
//                 <view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item" @click="handleEmojiSend(item)">
//                     <text class="text-2xl leading-none">{{ item }}</text>
//                 </view>
//             </view>
//             <!-- 礼物 -->
//             <view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showGift">
//                 <view class="flex flex-col items-center" v-for="(item, index) in giftList" :key="index" :item="item" @click="handleGiftSend(item)">
//                     <image class="block w-20 h-20" :src="item.image" mode="aspectFill" lazy-load="false"></image>
//                     <text class="mt-1">{{ item.title }}</text>
//                     <text class="text-xs leading-none text-fuchsia-500 mt-2">{{ item.price }}铜币</text>
//                 </view>
//             </view>
//             <!-- 操作 -->
//             <view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showPlus">
//                 <view class="flex flex-col justify-center text-center" @tap="handleImage">
//                     <view class="rounded-lg bg-white p-4 mx-auto">
//                         <i class="ri-image-fill block text-2xl leading-none text-black"></i>
//                     </view>
//                     <view class="text-base leading-none mt-2">相册</view>
//                 </view>
// <!--                <view class="flex flex-col justify-center text-center" @tap="handleVideo">
//                     <view class="rounded-lg bg-white p-4 mx-auto">
//                         <i class="ri-camera-fill block text-2xl leading-none text-black"></i>
//                     </view>
//                     <view class="text-base leading-none mt-2">拍摄</view>
//                 </view>
//                 <view class="flex flex-col justify-center text-center" @tap="handleVideo">
//                     <view class="rounded-lg bg-white p-4 mx-auto">
//                         <i class="ri-vidicon-fill block text-2xl leading-none text-black"></i>
//                     </view>
//                     <view class="text-base leading-none mt-2">录制</view>
//                 </view> -->
//                 <view class="flex flex-col justify-center text-center" @click="handleGift">
//                     <view class="rounded-lg bg-white p-4 mx-auto">
//                         <i class="ri-gift-fill block text-2xl leading-none text-black"></i>
//                     </view>
//                     <view class="text-base leading-none mt-2">礼物</view>
//                 </view>
//             </view>
//         </view>

//         <view v-if="showSvga" id="svgaPlayer" class="fixed w-full h-screen top-0 right-0 bottom-0 left-0">
//             <l-svga ref="svgaPlayer"></l-svga>
//         </view>
//         <uc-auth></uc-auth>
//     </view>
// </template>
// <script>
// import { mapState } from 'vuex'
// import Socket from '@/common/chat.js'
// 	import RecordRTC from 'recordrtc'
// 	// import _data from "../../common/_mixins";
// export default {
//     name: 'mine',
//     components: {
//     },
//     data() {
//         return {
//             chat: {},
//             user: {},
//             socket: null,
//             params: {
//                 type: 'all',
//                 page: 1,
//             },
//             paginator: {
//                 total: 0,
//                 last_page: 0,
//             },
// 			scrollInto: '',
//             loadmore: false,
//             text: '',
//             messageList: [],
//             showEmoji: false,
//             emojiList: [],
//             giftList: [],
//             showSvga: false,
//             showPlus: false,
//             showImage: false,
//             showCamera: false,
//             showRecord: false,
//             showGift: false,
//             audio: null,
//             audioStatus: false,
//             video: null,
//             videoStatus: false,
//             recorder: uni.getRecorderManager(),
//             recording: false,
//             recordStoping: false,
//             recordTip: "按住说话",
//             recordTimer: null,
//             recordLength: 0,
//             recordPoint: {
//                 identifier: 0,
//                 Y: 0
//             },
			
			
			
			
// 			voiceH5Tis:'',
// 			is_start_record: false, //是否开始录音
// 			recorder_h5: null, //录音对象
// 			recorder_timer: null, //录音定时器
// 			recorder_time: 0,
//         }
//     },
//     computed: {
//         ...mapState({
//             userInfo: state => state.user.userInfo,
//         })
//     },
// 	created() {
//         let that = this
//         that.getUserProfile()
//         that.getEmojiList()
//         that.getGiftList()
// 	},
//     onLoad() {
//         let that = this
//         that.init()
// 		//注册事件
// 		// 注册发送音频事件
// 		this.regOnStartEvent((e) => {
// 			this.recordBegin(e);
// 		});
// 		// 注册发送音频事件
// 		this.regSendVoiceEvent((e) => {
// 			this.recordEnd(e);
// 		});
		
// 		// 注册发送音频事件
// 		this.regVudioEndEvent((e) => {
// 			this.playMsgid = null;
// 		});
//     },
//     beforeDestroy() {
//         let that = this
//         if (that.socket) {
//             that.socket.close()
//         }
//     },
//     methods: {
		
// 		// 发送消息
// 		sendMsg(content, type) {
// 			// uni.showLoading();
// 			let _this = this,
// 				sendMsg = content;
// 			((callback) => {
// 				switch (type) {
// 					/** 文字/表情消息 */
// 					case 0:
// 						let msg = this.textMsg.replace(/</g, "&lt;");
// 						sendMsg = {
// 							text: msg,
// 						};
// 						//  @好友
// 						if (_this.send_user_id) {
// 							sendMsg.user_id = _this.send_user_id;
		
// 						}
// 						callback();
// 						break;
// 						/** 语音/图片/视频/文件 */
// 					case 1:
// 					case 2:
// 					case 3:
// 					case 4:
// 						uni.showLoading({
// 							title: "发送中",
// 						});
// 						_this.$httpSendFile({
// 							type: 0,
// 							local_url: sendMsg.url,
// 							data: {
// 								list_id: _this.list_id,
// 							},
// 							success(data) {
// 								console.log("数据", data);
		
// 								uni.hideLoading();
// 								sendMsg.url = data.save_name;
// 								sendMsg.full_url = data.full_url;
// 								sendMsg.full_movie = data.full_movie;
// 								if ("save_gif_path" in data)
// 									sendMsg.save_pic_path = data.save_gif_path;
// 								console.log("success");
// 								callback();
		
// 							},
// 						});
// 						break;
// 						/** 红包消息 */
// 					case 5:
// 						// TODO 邀请音视频
// 						callback();
// 						break;
		
// 					case 10:
// 						// 地图
// 						sendMsg = content;
// 						callback();
// 						break;
				
// 					default:
// 						break;
// 				}
// 			})(() => {
// 				// @好友 发送后清空user_id
// 				_this.send_user_id = "";
// 				_this.$httpSend({
// 					path: "/im/message/textMsg",
// 					data: {
// 						list_id: _this.list_id,
// 						content_type: type,
// 						content: JSON.stringify(sendMsg),
// 					},
// 					success_action: true,
// 					success(res) {
// 						// uni.hideLoading();
// 						switch (res.err) {
// 							case 0:
// 								if (type == 1) {
// 									_action.playVoice("/static/voice/voice.mp3");
// 								}
// 								break;
// 							case 1:
// 								uni.showModal({
// 									title: "好友提示",
// 									confirmText: "发送好友申请",
// 									content: res.msg,
// 									success: function(res) {
// 										if (res.confirm) {
// 											uni.navigateTo({
// 												url: "../friend/apply?user_id=" +
// 													_data
// 													.localData(
// 														_this
// 														.list_id
// 													)
// 													.obj_id +
// 													"&is_type=0",
// 											});
// 										}
// 									},
// 								});
// 								break;
// 							case 2:
// 								uni.showModal({
// 									content: res.msg,
// 								});
// 								let data = _data.localData(data.list_id);
// 								data.is_msg = 1;
// 								_this.msgList.is_msg = 1;
// 								_data.localData(data.list_id, data);
// 								break;
// 							default:
// 								break;
// 						}
// 					},
// 				});
// 			});
// 		},
		
		
// 		// 录音开始H5 TODO
// 		voiceBeginH5(e) {
		
// 			if (!this.is_start_record) {
// 				navigator.mediaDevices.getUserMedia({
// 					video: false,
// 					audio: true
// 				}).then((stream) => { -->
// 					this.recorder_h5 = RecordRTC(stream, {
// 						type: 'audio'
// 					});
// 					this.is_start_record = true
// 					console.log("recorder", this.recorder_h5)
// 					this.recorder_h5.startRecording();
// 					this.recorder_time = 0
// 					this.recorder_timer = setInterval(() => {
// 						this.recorder_time += 0.1
// 					}, 100)
// 					uni.showModal({
// 						title: '提示',
// 						content: '正在录音中....',
// 						confirmText: '发送录音',
// 						cancelText: '取消录音',
// 						success: (res) => {
// 							clearInterval(this.recorder_timer);
// 							this.recorder_timer = null
// 							if (res.confirm) {
// 								this.recorder_h5.stopRecording((res_data) => {
// 									// console.log("res_data", res_data)
// 									let blob = this.recorder_h5.getBlob();
// 									// console.log("blob", blob)
// 									// RecordRTC.invokeSaveAsDialog(blob);
// 									uni.downloadFile({
// 										url: res_data,
// 										success: e => {
// 											// console.log("e", e)
// 											let msg = {
// 												length: 0,
// 												url: e.tempFilePath,
// 											};
// 											console.log('666',JSON.stringify(msg));
// 											let min = parseInt(this
// 												.recorder_time / 60);
// 											let sec = parseInt(this
// 												.recorder_time % 60);
// 											min = min < 10 ? "0" + min : min;
// 											sec = sec < 10 ? "0" + sec : sec;
// 											if (min > 0 || sec > 0) {
// 												msg.length = min + ":" + sec;
// 												this.sendMsg(msg, 1);
// 												console.log('msg',msg);
// 											}
// 										}
// 									})
// 									this.is_start_record = false
// 									this.recorder_h5.destroy();
// 								});
// 							} else {
// 								this.is_start_record = false
// 								this.recorder_h5.destroy();
// 							}
// 						}
// 					})
// 				});
// 			}
		
// 		},
// 		// 录音开始
// 		voiceBegin(e) {
// 			if (e.touches.length > 1) {
// 				return;
// 			}
// 			this.initPoint.Y = e.touches[0].clientY;
// 			this.initPoint.identifier = e.touches[0].identifier;
// 			// this.RECORDER.start({ format: "mp3" });//录音开始,
// 			// 开始录音
// 			this.RECORD.start({
// 				format: "mp3",
// 			});
// 		},
// 		//录音开始UI效果
// 		recordBegin(e) {
// 			/** 暂停语音播放 */
// 			this.AUDIO.pause();
// 			this.recording = true;
// 			this.voiceTis = "松开 结束";
// 		},
// 		// 录音被打断
// 		voiceCancel() {
// 			this.recording = false;
// 			this.voiceTis = "按住 说话";
// 			this.recordTis = "手指上滑 取消发送";
// 			this.willStop = true; //不发送录音
// 			this.RECORD.stop(); //录音结束
// 		},
// 		// 录音被打断H5
// 		voiceCancelH5() {
// 			this.recording = false;
// 			this.voiceTis = "按住 说话";
// 			this.recordTis = "手指上滑 取消发送";
// 			this.willStop = true; //不发送录音
// 			this.stopRecord()
// 		},
// 		// 录音中(判断是否触发上滑取消发送)
// 		voiceIng(e) {
// 			if (!this.recording) {
// 				return;
// 			}
// 			let touche = e.touches[0];
// 			//上滑一个导航栏的高度触发上滑取消发送
// 			if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
// 				this.willStop = true;
// 				this.recordTis = "松开手指 取消发送";
// 			} else {
// 				this.willStop = false;
// 				this.recordTis = "手指上滑 取消发送";
// 			}
// 		},
// 		// 结束录音
// 		voiceEndH5(e) {
// 			if (!this.recording) {
// 				return;
// 			}
// 			this.recording = false;
// 			this.voiceTis = "按住 说话";
// 			this.recordTis = "手指上滑 取消发送";
// 			this.stopRecord()
// 		},
// 		// 结束录音
// 		voiceEnd(e) {
// 			if (!this.recording) {
// 				return;
// 			}
// 			this.recording = false;
// 			this.voiceTis = "按住 说话";
// 			this.recordTis = "手指上滑 取消发送";
// 			this.RECORD.stop(); //录音结束
// 		},
// 		//录音结束(回调文件)
// 		recordEnd(e) {
// 			if (!this.willStop) {
// 				// console.log("e: " + JSON.stringify(e));
// 				let msg = {
// 					length: 0,
// 					url: e.tempFilePath,
// 				};
// 				console.log(JSON.stringify(msg));
// 				let min = parseInt(this.RecordTime / 60);
// 				let sec = this.RecordTime % 60;
// 				min = min < 10 ? "0" + min : min;
// 				sec = sec < 10 ? "0" + sec : sec;
// 				if (min > 0 || sec > 0) {
// 					msg.length = min + ":" + sec;
// 					// console.log('msg',msg);
// 					// this.sendMsg(msg, 1);
// 					// this.sendMsg(msg);
// 				}
// 			} else {
// 				console.log("取消发送录音");
// 			}
// 			this.willStop = false;
// 		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
//         init() {
//             let that = this
//             that.$api('chat.single', {
//                 user_id: that.$Route.query.user_id
//             }).then(res => {
//                 if (res.code === 1) {
// 					console.log('init',res.data);
//                     that.chat = res.data
//                     uni.setStorageSync('CHATSESSIONID', res.data.session_id)
//                     // 监听消息
//                     that.socket = new Socket((msg) => {
//                         that.parseMsg(msg.data)
//                     });
//                     // 监听录音
//                     that.recorder.onStart((e) => {
//                         that.recordStart(e)
//                     })
//                     that.recorder.onStop((e) => {
//                         that.recordStop(e)
//                     })
//                 } else {
//                     that.$u.toast(res.msg)
//                 }
//             })
//         },
//         changeTab(e) {
//             let that = this
//             that.type = e.type
//         },
// 		scrollBottom() {
//             let that = this
// 			let timeout = null
// 			that.scrollInto = ''
// 			clearTimeout(timeout)
// 			timeout = setTimeout(() => {
// 				that.scrollInto = 'scrollBottom'
// 			}, 300)
// 		},
//         // 解析消息
//         parseMsg(message) {
//             console.log(message)
//             let that = this
//             let msg = JSON.parse(message)
//             if (msg.code === 1) {
//                 switch (msg.type) {
//                     case 'init':
//                         that.sendMessage('', 'history')
//                         that.scrollBottom()
//                         break
//                     case 'text':
//                         that.messageList.push(msg.data)
//                         that.scrollBottom()
//                         break
//                     case 'image':
//                         that.messageList.push(msg.data)
//                         that.scrollBottom()
//                         break
//                     case 'audio':
//                         that.messageList.push(msg.data)
//                         that.scrollBottom()
//                         break
//                     case 'video':
//                         that.messageList.push(msg.data)
//                         that.scrollBottom()
//                         break
//                     case 'history':
//                         that.messageList = msg.data.data
//                         that.messageList.sort((a, b) => { return a.id - b.id })
//                         break
//                     default:
//                 }
//             } else {
//                 that.$u.toast('连接错误：' + msg.msg)
//             }
//         },
//         // 获取历史聊天记录
//         async getMessageList() {
//             let that = this
//             let params = {
//                 type: 'history',
//                 msg: 'send',
//                 data: ''
//             }
//             let res = await that.socket.send(JSON.stringify(params))
//         },
//         // 发送服务数据
//         async sendMessage(data, type = 'text') {
//             let that = this
//             let params = {
//                 type: type,
//                 msg: 'send',
//                 data: data
//             }
//             let res = await that.socket.send(JSON.stringify(params))
//         },
//         handleTextSend() {
//             let that = this
//             if (that.text === '') {
//                 return
//             }
//             that.sendMessage(that.text, 'text')
//             that.showEmoji = false
//             that.text = ''
//         },
//         handleEmoji() {
//             let that = this
//             that.showEmoji = !that.showEmoji
//             that.showRecord = false
//             that.showPlus = false
//             that.showGift = false
//         },
//         handleVoice() {
//             let that = this
//             that.showRecord = !that.showRecord
//             that.showEmoji = false
//             that.showPlus = false
//             that.showGift = false
//         },
//         handlePlus() {
//             let that = this
//             that.showPlus = !that.showPlus
//             that.showRecord = false
//             that.showEmoji = false
//             that.showGift = false
//         },
//         handleEmojiSend(item) {
//             let that = this
//             that.text += item
//         },
//         handleGift() {
//             let that = this
//             that.showGift = !that.showGift
//             that.showPlus = false
//         },
//         handleGiftSend(item) {
//             let that = this
//             that.gift = item
//             if (that.userInfo.money < that.gift.price) {
//                 // that.$api.msg('账户铜币不足')
// 				that.$u.toast('账户铜币不足')
//                 return
//             }
//             that.sendMessage(that.gift.image, 'gift')
//             that.showGift = false
//             that.handleGiftPlay()
// 			// that.handleTextSend()
// 			// 强制刷新
// 				setTimeout(() => {
// 					this.$router.go(0)
// 				}, 10)
//         },
//         handleGiftPlay() {
//             let that = this
//             that.showSvga = true
//             that.$nextTick(() => {
//                 that.$refs.svgaPlayer.render(async (parser, player) => {
//                     let videoItem = await parser.load(that.gift.url)
//                     await player.setVideoItem(videoItem)
//                     player.loops = 1
//                     player.startAnimation()
//                     player.onFinished(() => {
//                         that.showSvga = false
//                     })
//                 })
//             })
//         },
//         async getUserProfile() {
//             let that = this
//             that.$api('user.profile', { user_id: that.$Route.query.user_id }).then(res => {
//                 if (res.code === 1) {
//                     that.user = res.data
//                 }
//             })
//         },
//         async getEmojiList() {
//             let that = this
//             if (uni.getStorageSync('EMOJILIST')) {
//                 that.emojiList = uni.getStorageSync('EMOJILIST')
//             } else {
//                 that.emojiList = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','🥲','😚','🙂','🤗','🤩','🤔','🫡','🤨','😐','😑','😶','🫥','😶‍🌫️','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🫤','🙃','🫠','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😮‍💨','😰','😱','🥵','🥶','😳','🤪','😵','😵‍💫','🥴','😠','😡','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳','🥸','🥺','🥹','🤠','🤡','🤥','🤫','🤭','🫢','🫣','🧐','🤓','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖','💩','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','🐵','🐶','🐺','🐱','🦁','🐯','🦒','🦊','🦝','🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐻‍❄️','🐨','🐼','🐸','🦓','🐴','🦄','🐔','🐲','🐽','🐾','🐒','🦍','🦧','🦮','🐕‍🦺','🐩','🐕','🐈','🐈‍⬛','🐅','🐆','🐎','🦌','🦬','🦏','🦛','🐂','🐃','🐄','🐖','🐏','🐑','🐐','🐪','🐫','🦙','🦘','🦥','🦨','🦡','🐘','🦣','🐁','🐀','🦔','🐇','🐿️','🦫','🦎','🐊','🐢','🐍','🐉','🦕','🦖','🦦','🦈','🐬','🦭','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦞','🦀','🐚','🪸','🦆','🐓','🦃','🦅','🕊️','🦢','🦜','🦩','🦚','🦉','🦤','🪶','🐦','🐧','🐥','🐤','🐣','🦇','🦋','🐌','🐛','🦟','🪰','🪱','🦗','🐜','🪳','🐝','🪲','🐞','🦂','🕷️','🕸️','🦠','🧞‍♀️','🧞‍♂️','🧞','🧟‍♀️','🧟‍♂️','🧟','🧌','🗣️','👤','👥','🫂','👁️','👀','🦴','🦷','👅','👄','🫦','🧠','🫀','🫁','🦾','🦿','👣','🤺','⛷️']
//                 uni.setStorageSync('EMOJILIST', that.emojiList)

//             }
//         },
//         async getGiftList() {
//             let that = this
//             if (uni.getStorageSync('GIFTLIST')) {
//                 that.giftList = uni.getStorageSync('GIFTLIST')
//             } else {
//                 that.$api('gift.lists').then(res => {
// 					console.log(res.data);
//                     if (res.code === 1) {
//                         that.giftList = res.data.data
//                         uni.setStorageSync('GIFTLIST', that.giftList)
//                     }
//                 })
//             }
//         },
//         handlePlayAudio(audio) {
//             let that = this
//             if (!audio) {
//                 that.$u.toast('语音不能为空')
//                 return false
//             }
//             if (!that.audio) {
//                 that.audio = uni.createInnerAudioContext()
//                 that.audio.src = audio
//             }
//             that.audioStatus = !that.audioStatus
//             if(that.audioStatus) {
//                 that.$nextTick(function () {
//                     that.audio.play()
//                     that.audio.onEnded((e) => {
//                         that.audioStatus = false
//                     })
//                 })
//             } else {
//                 that.$nextTick(function () {
//                     that.audio.pause()
//                 })
//             }
//         },
//         // handlePlayVideo(video) {
//         //     let that = this
//         //     if (!video) {
//         //         that.$u.toast('视频不能为空')
//         //         return false
//         //     }
//         //     if (!that.video) {
//         //         that.video = uni.createVideoContext('video')
//         //         that.video.src = video
//         //     }
//         //     that.videoStatus = !that.videoStatus
//         //     if(that.videoStatus) {
//         //         that.$nextTick(function () {
//         //             that.video.play()
//         //         })
//         //     } else {
//         //         that.$nextTick(function () {
//         //             that.video.pause()
//         //         })
//         //     }
//         // },
//         handleRecordStart(e) {
//             let that = this
//             console.log('touch start')
//             if (e.touches.length > 1) {
//                 return
//             }
//             that.recording = true
//             that.recordStoping = false
//             that.recordTip = '正在录制…'
//             that.recordPoint.Y = e.touches[0].clientY
//             that.recordPoint.identifier = e.touches[0].identifier
//             that.recorder.start({
//                 format: "mp3"
//             })
//         },
//         handleRecordStop(e) {
//             let that = this
//             console.log('touch stop')
//             if (!that.recording) {
//                 return
//             }
//             that.recording = false
//             that.recordTip = '按住说话'
//             that.recorder.stop()
//         },
//         handleRecordDoing(e) {
//             let that = this
//             console.log('touch move')
//             if (that.recordPoint.Y - e.touches[0].clientY >= uni.upx2px(100)) {
//                 that.recordStoping = true
//                 that.recordTip = '松开手指，取消发送'
//             }
//         },
//         recordStart(e) {
//             let that = this
// 			console.log('recorder start' + JSON.stringify(e));
//             that.recordLength = 0
//             that.recordTimer = setInterval(() => {
//                 that.recordLength++
//             }, 1000)
// 		},
//         recordStop(e) {
//             let that = this
// 			console.log('recorder stop' + JSON.stringify(e))
//             that.recording = false
//             clearInterval(that.recordTimer)
//             uni.uploadFile({
//                 url: that.$API_URL + 'index/upload',
//                 filePath: e.tempFilePath,
//                 name: 'file',
//                 success: res => {
//                     res = JSON.parse(res.data)
//                     if (res.code === 1) {
//                         that.sendMessage(res.data.fullurl, 'audio')
//                     } else {
//                         that.$u.toast(res.msg)
//                     }
//                 },
//                 complete: e => {}
//             })
// 		},
//         handleImage() {
//             let that = this
//             uni.chooseImage({
//                 count: 3,
//                 sizeType: ['original', 'compressed'],
//                 sourceType: ['album'],
//                 success: (res) => {
//                     res.tempFilePaths.forEach(item => {
//                         uni.uploadFile({
//                             url: that.$API_URL + 'index/upload',
//                             filePath: item,
//                             name: 'file',
//                             success: res => {
//                                 res = JSON.parse(res.data)
//                                 if (res.code === 1) {
//                                     that.sendMessage(res.data.fullurl, 'image')
//                                 } else {
//                                     that.$u.toast(res.msg)
//                                 }
//                             },
//                             complete: e => {}
//                         })
//                     })
//                 }
//             })
//         },
//         // handleVideo() {
//         //     let that = this
//         //     uni.chooseVideo({
//         //         maxDuration: 10,
//         //         sourceType: ['album'],
//         //         success: (res) => {
//         //             console.log(res)
//         //             if (res.size > 10 * 1024 * 1024) {
//         //                 that.$u.toast('视频不能超过10M')
//         //                 return false
//         //             }
//         //             uni.uploadFile({
//         //                 url: that.$API_URL + 'index/upload',
//         //                 filePath: res.tempFilePath,
//         //                 name: 'file',
//         //                 success: res => {
//         //                     res = JSON.parse(res.data)
//         //                     console.log(res)
//         //                     if (res.code === 1) {
//         //                         that.sendMessage(res.data.fullurl, 'video')
//         //                     } else {
//         //                         that.$u.toast(res.msg)
//         //                     }
//         //                 },
//         //                 complete: e => {}
//         //             })
//         //         }
//         //     })
//         // },
//     }
// }
// </script>
// <style lang="scss" scoped>

// </style>
