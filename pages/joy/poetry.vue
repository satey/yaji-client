<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="p-4 h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
        <view class="flex justify-between">
            <view class="rounded-full bg-black bg-opacity-20 px-5 py-3">
                <view class="leading-none text-white">曲水流觞</view>
                <view class="text-sm leading-none text-white opacity-50 mt-1">语音交友</view>
            </view>
            <view class="flex flex-row items-center">
                <view class="rounded-full w-10 h-10 flex items-center justify-center bg-black bg-opacity-20 mr-4" @click="showHelp = true">
                    <i class="ri-question-line text-2xl leading-none text-white opacity-70"></i>
                </view>
                <view class="rounded-full w-10 h-10 flex items-center justify-center bg-black bg-opacity-20" @click="$u.route({ type: 'navigateBack', delta: 1 })">
                    <i class="ri-close-fill text-2xl leading-none text-white opacity-70"></i>
                </view>
            </view>
        </view>
        <view class="grid grid-cols-4 gap-6 mt-10">
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-red-500 bg-opacity-80 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                    <view class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500"></view>
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <!-- <i class="ri-vip-crown-2-fill text-base leading-none text-pink-500 mr-1"></i> -->
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
            <view class="flex flex-col truncate">
                <view class="flex m-auto relative rounded-full bg-black bg-opacity-10 p-1">
                    <image class="rounded-full w-14 h-14 block" :src="userInfo.avatar" />
                </view>
                <view class="flex items-center m-auto mt-1">
                    <view class="text-white">{{ userInfo.role_realname }}</view>
                </view>
            </view>
        </view>
        <view class="flex mt-4">
            <view class="flex items-center m-auto relative rounded-full bg-black bg-opacity-10 px-10 py-2">
                <i class="ri-user-fill text-base leading-none text-white opacity-50 mr-1"></i>
                <text class="text-sm text-white opacity-50 mr-3">6</text>
                <i class="ri-arrow-drop-down-line text-base leading-none text-white opacity-50"></i>
            </view>
        </view>

        <view class="fixed bottom-28 left-0 right-0 p-4 w-9/12">
            <view class="rounded text-cyan-300 bg-black bg-opacity-5 p-1 mt-1">倡导绿色健康直播，严禁未成年人的直播和打赏行为。对任何违法违规、低俗色情、暴力伤害、吸烟酗酒的行为严令禁止。</view>
            <view class="text-white mt-2">
                <i class="ri-vip-crown-2-fill text-pink-500 mr-1"></i>
                <text class="text-yellow-300 mr-3">{{ userInfo.role_realname }}</text>
                <text class="text-white">来了</text>
            </view>
            <view class="text-white mt-2">
                <text class="text-white mr-3">酒杯现在转到</text>
                <i class="ri-vip-crown-2-fill text-pink-500 mr-1"></i>
                <text class="text-yellow-300 mr-3">{{ userInfo.role_realname }}</text>
                <text class="text-white">身边啦</text>
            </view>
            <view class="text-white mt-2">
                <text class="text-white mr-3">酒杯继续往下一位转动……</text>
            </view>
        </view>

        <view class="fixed bottom-0 left-0 right-0">
            <view class="flex p-4">
                <view class="mr-4 flex items-center" @click="handleVoice">
                    <i class="ri-mic-2-fill block text-4xl leading-none text-gray-300"></i>
                </view>
                <view class="flex-1 mr-4 rounded-full h-10 flex items-center px-4 bg-gray-300">
                    <u-input v-model="message" @confirm="handleMessageSend" type="text" placeholder="说点什么吧" :clearable="true" customStyle="border: none; background: none; padding: 0;">
                    </u-input>
                </view>
                <view class="mr-4 flex items-center" @click="handleEmoji">
                    <i class="ri-emotion-fill block text-4xl leading-none text-gray-300"></i>
                </view>
                <view class="flex items-center" v-if="!message" @click="handleGift">
                    <i class="ri-gift-fill text-4xl leading-none text-gray-300"></i>
                </view>
                <view class="flex items-center" v-if="message" @click="handleMessageSend">
                    <text class="rounded-full p-2 px-3 text-sm text-white bg-gradient-to-r from-purple-800 to-purple-900">发送</text>
                </view>
            </view>
            <!-- 语音 -->
            <view class="flex flex-col items-center bg-indigo-900 p-4 h-60 overflow-y-scroll" v-if="showRecord">
                <view class="text-xs leading-none text-gray-300">{{ recordTip }}</view>
                <view class="flex justify-center items-center mt-16" @touchstart="handleRecordStart" @touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop">
                    <view class="relative flex justify-center items-center rounded-full">
                        <view class="flex justify-center items-center rounded-full w-20 h-20 bg-purple-800 z-10">
                            <i class="ri-mic-fill text-4xl leading-none text-white"></i>
                        </view>
                        <view v-if="recording" class="animate-ping absolute rounded-full p-2 bg-purple-900 opacity-20">
                            <view class="rounded-full w-20 h-20 p-2 bg-purple-800 opacity-50"></view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 表情 -->
            <view class="grid grid-cols-12 gap-2 bg-indigo-900 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
                <view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item" @click="handleEmojiSend(item)">
                    <text class="text-xl leading-none">{{ item }}</text>
                </view>
            </view>
            <!-- 礼物 -->
            <view class="grid grid-cols-4 gap-4 bg-indigo-900 p-4 h-60 overflow-y-scroll" v-if="showGift">
                <view class="flex flex-col items-center" v-for="(item, index) in giftList" :key="index" :item="item" @click="handleGiftSend(item)">
                    <image class="block w-20 h-20" :src="item.image" mode="aspectFill" lazy-load="false"></image>
                    <text class="mt-1">{{ item.title }}</text>
                    <text class="text-xs leading-none text-fuchsia-500 mt-2">{{ item.price }}铜币</text>
                </view>
            </view>
        </view>

        <u-modal :show="showHelp" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full text-center">
                <view class="text-4xl mt-4">小贴士</view>
                <view class="mt-6 text-left">{{ help }}</view>
                <view class="grid gap-4 mt-8">
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showHelp = false">确定</view>
                </view>
            </view>
        </u-modal>
        <view v-if="showSvga" id="svgaPlayer" class="fixed w-full h-screen top-0 right-0 bottom-0 left-0">
            <l-svga ref="svgaPlayer"></l-svga>
        </view>
        <uc-auth></uc-auth>
    </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
            help: '小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士',
            showHelp: false,
            message: '',
            messageList: [],
            emojiList: ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','🥲','😚','🙂','🤗','🤩','🤔','🫡','🤨','😐','😑','😶','🫥','😶‍🌫️','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🫤','🙃','🫠','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😮‍💨','😰','😱','🥵','🥶','😳','🤪','😵','😵‍💫','🥴','😠','😡','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳','🥸','🥺','🥹','🤠','🤡','🤥','🤫','🤭','🫢','🫣','🧐','🤓','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖','💩','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','🐵','🐶','🐺','🐱','🦁','🐯','🦒','🦊','🦝','🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐻‍❄️','🐨','🐼','🐸','🦓','🐴','🦄','🐔','🐲','🐽','🐾','🐒','🦍','🦧','🦮','🐕‍🦺','🐩','🐕','🐈','🐈‍⬛','🐅','🐆','🐎','🦌','🦬','🦏','🦛','🐂','🐃','🐄','🐖','🐏','🐑','🐐','🐪','🐫','🦙','🦘','🦥','🦨','🦡','🐘','🦣','🐁','🐀','🦔','🐇','🐿️','🦫','🦎','🐊','🐢','🐍','🐉','🦕','🦖','🦦','🦈','🐬','🦭','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦞','🦀','🐚','🪸','🦆','🐓','🦃','🦅','🕊️','🦢','🦜','🦩','🦚','🦉','🦤','🪶','🐦','🐧','🐥','🐤','🐣','🦇','🦋','🐌','🐛','🦟','🪰','🪱','🦗','🐜','🪳','🐝','🪲','🐞','🦂','🕷️','🕸️','🦠','🧞‍♀️','🧞‍♂️','🧞','🧟‍♀️','🧟‍♂️','🧟','🧌','🗣️','👤','👥','🫂','👁️','👀','🦴','🦷','👅','👄','🫦','🧠','🫀','🫁','🦾','🦿','👣','🤺','⛷️'],
            giftList: [],
            showSvga: false,
            showEmoji: false,
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
    onLoad() {
        let that = this
        that.getProfile()
        that.getMessageList()
        that.getGiftList()
        // #ifndef H5
        this.recorder.onStart((e) => {
            this.recordStart(e)
        })
        this.recorder.onStop((e) => {
            this.recordStop(e)
        })
        // #endif
    },
    methods: {
        handleMessageSend() {
            let that = this
            if (that.message === '') {
                return
            }
            that.message = ''
        },
        handleEmoji() {
            let that = this
            that.showEmoji = !that.showEmoji
            that.showRecord = false
            that.showGift = false
        },
        handleVoice() {
            let that = this
            that.showRecord = !that.showRecord
            that.showEmoji = false
            that.showGift = false
        },
        handleEmojiSend(item) {
            let that = this
            that.message += item
        },
        handleGift() {
            let that = this
            that.showGift = !that.showGift
            that.showRecord = false
            that.showEmoji = false
        },
        handleGiftSend(item) {
            let that = this
            that.showGift = false
            that.gift = item
            if (that.userInfo.money < that.gift.price) {
                that.$api.msg('账户铜币不足')
                return
            }
            that.handleGiftPlay()
        },
        handleGiftPlay() {
            let that = this
            that.showSvga = true
            that.$nextTick(() => {
                that.$refs.svgaPlayer.render(async (parser, player) => {
                    let svga = ''
                    if (uni.getStorageSync(this.gift.title)) {
                        let a = uni.getStorageSync(this.gift.title)
                        svga = await parser.load(String(a))
                    } else {
                        svga = await parser.load(this.gift.url)
                    }
                    await player.setVideoItem(svga)
                    player.loops = 1
                    player.startAnimation()
                    player.onFinished(() => {
                        that.showSvga = false
                    })
                })
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
        async getProfile() {
            let that = this
            that.$api('user.profile', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.user = res.data
                }
            })
        },
        async getMessageList() {
            let that = this
            that.loadmore = 'loading'
            that.$api('post.user', { user_id: that.$Route.query.user_id }).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.messageList = [...that.messageList, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else {
                        that.loadmore = 'nomore'
                    }
                }
            })
        },
        async getGiftList() {
            let that = this
            that.$api('gift.lists').then(res => {
                if (res.code === 1) {
                    that.giftList = res.data.data
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
