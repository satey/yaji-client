<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar :title="user.role_realname" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <i class="ri-more-fill text-3xl" @click="$u.route('pages/chat/groupsetting')"></i>
            </view>
        </u-navbar>
        
		<scroll-view class="h-screen" scroll-y="true" scroll-with-animation="true" show-scrollbar="false" :scroll-into-view="scrollInto">
            <view class="text-center text-xs text-gray-500" v-if="!messageList || messageList.length === 0">现在开始留言吧</view>
            <view class="mt-6 px-4" v-for="(item, index) in messageList" :key="index" :item="item">
                <view class="text-center">
                    <text class="p-1 px-2 rounded text-xs leading-none text-gray-400 bg-gray-50">{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM') }}</text>
                </view>
                <view class="flex justify-end mt-6">
                    <view class="flex justify-end w-4/6">
                        <view class="mr-3">
                            <view v-if="item.type === 'text'" class="rounded-3xl rounded-tr-none p-3 text-base text-white bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 whitespace-pre-wrap">{{ item.content }}</view>
                        </view>
                        <view class="flex">
                            <image class="block rounded-full w-10 h-10" :src="item.user.avatar || '/static/avatar.png'"></image>
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
            <view class="grid grid-cols-12 gap-2 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
                <view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item" @click="handleEmojiSend(item)">
                    <text class="text-xl leading-none">{{ item }}</text>
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
                <view class="flex flex-col justify-center text-center" @tap="handleAlbum">
                    <view class="rounded-lg bg-white p-4 mx-auto">
                        <i class="ri-image-fill block text-2xl leading-none text-black"></i>
                    </view>
                    <view class="text-base leading-none mt-2">相册</view>
                </view>
                <view class="flex flex-col justify-center text-center" @tap="handleCamera">
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
                </view>
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
            socket: null, //socket服务
            user: {},
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
			scrollInto: '', //scrollBottom
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
            audio: uni.createInnerAudioContext(),
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
        // #ifndef H5
        this.recorder.onStart((e) => {
            this.recordStart(e)
        })
        this.recorder.onStop((e) => {
            this.recordStop(e)
        })
        // #endif

        // 监听消息
        that.socket = new Socket((msg) => {
            that.parseMsg(msg.data)
        });
	},
    onLoad() {
        let that = this
    },
    beforeDestroy() {
        let that = this
        that.socket.close()
    },
    methods: {
        changeTab(e) {
            let that = this
            that.type = e.type
        },
        parseMsg(message) {
            console.log(message)
            let that = this
            let msg = JSON.parse(message)
            if (msg.code === 1) {
                switch (msg.type) {
                    case 'init':
                        uni.setStorageSync('CHATSESSIONID', msg.data.session_id)
                        that.getMessageList()
                        that.scrollBottom()
                        break
                    case 'text':
                        that.messageList.push(msg.data)
                        that.scrollBottom()
                        // uni.vibrateLong()
                        break
                    case 'gift':
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
                msg: '',
                data: ''
            }
            let res = await that.socket.send(JSON.stringify(params))
            // console.log(res)
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
            // console.log(res)
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
                that.$api.msg('账户铜币不足')
                return
            }
            that.sendMessage(that.gift, 'gift')
            that.showGift = false
            that.handleGiftPlay()
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
        async handleAlbum() {
            let that = this
            that.showPlus = false
            uni.chooseImage({
                count: 9,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    res.tempFilePaths.forEach(item => {
                        uni.uploadFile({
                            url: that.action,
                            method: "POST",
                            header: {
                                'Authorization': uni.getStorageSync('token'),
                                'Content-Type': 'multipart/form-data'
                            },
                            filePath: item,
                            name: 'file',
                            success: (result) => {
                                let res = JSON.parse(result.data)
                                if (res.code == 200) {
                                    that.imageList = that.imageList.concat(res.data[0].data);
                                    console.log(that.imageList, '上传图片成功')
                                } else {
                                    that.$u.toast('上传失败')
                                }
                            }
                        })
                    })
                
                }
            })
        },
        async handleCamera() {
            let that = this
            that.showPlus = false
            uni.chooseImage({
                sourceType: ['camera'],
                sizeType: ['original', 'compressed'],
                success: (res) => {
                    for (let i = 0; i < res.tempFilePaths.length; i++) {
                        uni.getImageInfo({
                            src: res.tempFilePaths[i],
                            success: (image) => {
                                that.$u.toast('TODO')
                                // this.$request.upfile(res.tempFilePaths[i]).then(resf => {
                                //     this.$request.http('/Conversation/CreateDetail', {
                                //         ConversationId: this.id,
                                //         OperateType: 2,
                                //         MsgContent: resf.data
                                //     }).then((ref) => {
                                //         this.getMessageList()
                                //     })
                                // })
                            }
                        })
                    }
                }
            })
        },
        async handleVideo() {
            let that = this
            that.showEmoji = false
            uni.chooseVideo({
                sourceType: ['camera', 'album'],
                maxDuration: 10,
                success: res => {
                    if (Math.floor(res.duration) > 10) {
                        that.$u.toast('视频时长不得超过10秒')
                        return
                    } else {
                        uni.compressVideo({
                            src: res.tempFilePath,
                            quality: 'medium', //'low':低，'medium':中，'high':高
                            success: (res) => {
                                that.$u.toast('TODO')
                                // that.$request.upfile(res.tempFilePath).then(result => {
                                //     that.$request.http('/Conversation/CreateDetail', {
                                //         ConversationId: that.id,
                                //         OperateType: 7,
                                //         MsgContent: result.data
                                //     }).then((ref) => {
                                //         that.getMessageList()
                                //     })
                                // })
                            },
                        })
                    }
                }
            })
        },
        // 播放语音
        handlePlayVoice(msg) {
            this.audio.src = msg.MsgContent
            this.$nextTick(function () {
                this.audio.play()
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
                    if (res.code === 1) {
                        that.giftList = res.data.data
                        uni.setStorageSync('GIFTLIST', that.giftList)
                    }
                })
            }
        },
    }
}
</script>
<style lang="scss" scoped>

</style>
