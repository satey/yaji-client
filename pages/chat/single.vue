<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="" style="height: 100vh;width: 100%;display: flex;flex-direction: column;box-sizing: border-box;">
		<u-navbar title="qwe" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="backUrl()"></i>
			</view>
			<view slot="center" style="display: flex;align-items: center;">
				<image :src="user.avatar" style="width:50rpx;height:50rpx;border-radius:50%;margin-right: 10rpx;">
				</image>{{name}}
			</view>
			<view slot="right">
				<i class="ri-more-fill text-3xl"
					@click="$u.route('/pages/chat/charSeting',{user_id:$Route.query.user_id})"></i>
			</view>
		</u-navbar>
		<!-- 充值 -->
		<view v-if="recharge">
			<u-modal :show="recharge" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
				confirmText="充值" cancelText="放弃" @cancel="recharge=false" @confirm="$u.route('/pages/mine/recharge')">
				<view style="display: flex;flex-direction: column;">
					<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">铜钱不足</view>
					<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
						<text>铜钱不足,是否前往充值页面</text>
					</view>
				</view>
			</u-modal>
		</view>

		<scroll-view class="h-screen" scroll-y="true" :scroll-with-animation="false" show-scrollbar="false"
			:scroll-into-view="scrollInto" style="flex: 1;height: 0;box-sizing: border-box;background: #F7F7F7;"
			:refresher-enabled="isScrollDown" :refresher-triggered="scrollFlag" @refresherrefresh="scrollTop">
			<view class="text-center text-xs text-gray-500" v-if="!messageList || messageList.length === 0"></view>
			<view v-if="showSvga" id="svgaPlayer" class="fixed w-full h-screen top-0 right-0 bottom-0 left-0"
				style="z-index: 999;">
				<l-svga ref="svgaPlayer"></l-svga>
			</view>
			<uc-auth></uc-auth>
			<view class="mt-6 px-4" v-for="(item, index) in messageList" :key="index" :item="item">
				<view class="text-center">
					<text
						class="p-1 px-2 rounded text-xs leading-none text-gray-400 bg-gray-50">{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM') }}</text>
				</view>
				<view class="flex justify-end mt-6" v-if="item.user_id === userInfo.id">
					<view class="flex justify-end w-4/6">
						<view class="mr-3">
							<view v-if="item.type === 'text'"
								class="rounded-3xl rounded-tr-none p-3 text-base text-white bg-gradient-to-r  to-fuchsia-500 whitespace-pre-wrap"
								style="background: #FE4373;">
								{{ item.content }}
							</view>
							<view v-if="item.type === 'image'">
								<u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'gift'">
								<u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'audio'" @click="handlePlayAudio(item.content)"
								class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
								<i class="ri-voiceprint-line text-2xl text-white"
									:class="audioStatus ? 'animate-pulse' : ''"></i>
							</view>
						</view>
						<view class="flex">
							<image class="block rounded-full w-10 h-10" :src="item.avatar || '/static/avatar.png'">
							</image>
						</view>
					</view>
				</view>
				<view class="flex justify-start mt-6" v-else>
					<view class="flex justify-start w-4/6">
						<view class="flex">
							<image class="block rounded-full w-10 h-10" :src="item.avatar || '/static/avatar.png'"
								@click="$u.route('/pages/user/home',{user_id:item.user_id})">
							</image>
						</view>
						<view class="ml-3">
							<view v-if="item.type === 'text'"
								class="rounded-3xl rounded-tl-none p-3 text-base bg-gradient-to-r to-fuchsia-500 whitespace-pre-wrap"
								style="background: #fff;color: #333;">
								{{ item.content }}
							</view>
							<view v-if="item.type === 'image'">
								<u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'gift'">
								<u-album :urls="item.content.split(',')" multipleSize="150" rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'audio'" @click="handlePlayAudio(item.content)"
								class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
								<i class="ri-voiceprint-line text-2xl text-white"
									:class="audioStatus ? 'animate-pulse' : ''"></i>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="h-24" id="scrollBottom"></view>
		</scroll-view>

		<view class="bottom-0  left-0 right-0 !border-t border-0 border-solid border-gray-100 bg-white">
			<view class="flex p-4">
				<view class="mr-4 flex items-center" @click="handleVoice">
					<i class="ri-mic-2-fill block text-4xl leading-none text-gray-400"></i>
				</view>
				<textarea class="flex-1 mr-4 flex items-center bg-gray-100" :auto-height="true" @blur="blur"
					:auto-blur="false" @focus="focus" @confirm="handleTextSend" :adjustPosition="false"
					style="padding:20rpx;border-radius: 10rpx;font-size:28rpx;color: rgb(48, 49, 51);"
					placeholder="说点什么吧" v-model="text"
					placeholder-style="color: rgb(192, 196, 204);font-size:30rpx"></textarea>
				<!-- <view class="flex-1 mr-4 rounded-full h-10 flex items-center px-4 bg-gray-100">
					<u-input :auto-blur="false" v-model="text" @focus="focus" @blur="blur" :adjustPosition="false"
						@confirm="handleTextSend" type="text" placeholder="说点什么吧" :clearable="true"
						customStyle="border: none; background: none; padding: 0;">
					</u-input>
				</view> -->
				<view class="mr-4 flex items-center" @click="handleEmoji">
					<i class="ri-emotion-fill block text-4xl leading-none text-gray-400"></i>
				</view>
				<view class="flex items-center" v-if="!text" @click="handlePlus">
					<i class="ri-add-circle-fill text-4xl leading-none text-gray-400"></i>
				</view>
				<view class="flex items-center" v-if="text" @touchend.prevent="handleTextSend">
					<text class="rounded-full p-2 px-3 text-base text-white bg-gradient-to-r to-fuchsia-500"
						style="background: rgb(254, 67, 115);">发送</text>
				</view>
			</view>
			<!-- 语音 -->
			<view class="flex flex-col items-center bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showRecord">
				<view class="text-xs leading-none text-gray-500">{{ recordTip }}</view>
				<view class="flex justify-center items-center mt-16" @touchstart="handleRecordStart"
					@touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop">
					<view class="relative flex justify-center items-center rounded-full">
						<view class="flex justify-center items-center rounded-full w-20 h-20 bg-fuchsia-500 z-10"
							style="background: #FE4373 !important;">
							<i class="ri-mic-fill text-4xl leading-none text-white"></i>
						</view>
						<view v-if="recording" class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
							style="background: #FE4373 !important;">
							<view class="rounded-full w-20 h-20 p-2 bg-fuchsia-500 opacity-50">
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 表情 -->
			<view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
				<view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item"
					@click="handleEmojiSend(item)">
					<text class="leading-none" style="font-size: 1.8rem;">{{ item }}</text>
				</view>
			</view>
			<!-- 礼物 -->
			<view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showGift">
				<view v-for="(item, index) in giftList" :key="index" :item="item" v-if="item.status!='hidden'">
					<view class="flex flex-col items-center" @click="handleGiftSend(item)">
						<image class="block w-20 h-20" :src="item.image" lazy-load="false"></image>
						<text class="mt-1">{{ item.title }}</text>
						<text class="text-xs leading-none text-fuchsia-500 mt-2">{{ item.price }}铜钱</text>
					</view>
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
		<view class="sdasdas" :style="{height:pageHeight+'px'}"></view>
		<reward :giftIsShow="giftIsShow" @changend="changend"></reward>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import permision from "@/js_sdk/wa-permission/permission.js"
	import reward from "@/components/fei-reward/fei-reward.vue"
	// import Socket from '@/common/chat.js'
	export default {
		name: 'mine',
		components: {
			reward
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
				pageHeight: 0,
				page: 1,
				// ----------
				sessionList: [],
				// fei-------
				timeout: 1000, // 30s
				timeoutObj: null,
				historyPage: 1,
				loadingmMore: false,
				wsOnlion: false, //websocket是否在线,
				socKetUrl: "",
				timmer: null,
				scrollFlag: true,
				isScrollDown: true,
				msgPage: false,
				newMsg: [],
				name: "",
				recharge: false,
				giftIsShow: false,
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		created() {
			let that = this
			that.getGiftList()
			that.getUserProfile()
			that.getEmojiList()

			// #ifdef APP-PLUS
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			that.$store.watch((state, getters) => {
				if (state.message.giftId != '') {
					if (page.route == "pages/chat/single") {
						that.giftIsShow = true;
					}
				}
			})
			// #endif
		},
		destroyed() {
			// getApp().globalData.socketTask.close();
		},
		onLoad(e) {
			var that = this;
			this.msgPage = Boolean(e.megPgae);
			var delay = setTimeout(() => {
				// that.init();
				that.poetry()
				that.watchKeyboard();
				that.initSingleSocket();
				// that.unread();
				this.$nextTick(() => {
					that.scrollBottom();
				})
				clearTimeout(delay)
			}, 200)
		},
		onUnload() {
			this.$store.commit("setReceiverId", "");
			getApp().globalData.socketTask.close()
		},
		methods: {
			changend() {
				this.giftIsShow = false;
			},
			//诗词结缘
			poetry() {
				var that = this;
				var poetryItem = uni.getStorageSync("poetryItem");
				if (poetryItem != '') {
					that.$api("poetry.single", {
						poetry_id: poetryItem.id,
						receiver_id: poetryItem.user_id
					}).then(res => {
						if (res.code == 0) {
							that.sendMessage(res.msg, 'text');
							that.init();
						} else {
							that.init();
						}
						uni.removeStorageSync("poetryItem");
					})
				} else {
					that.init();
				}
			},
			//聊天页面socket监听
			initSingleSocket() {
				var that = this;
				var newMeg = [];
				that.$store.commit("setReceiverId", that.$Route.query.user_id);
				getApp().globalData.socketTask.onMessage((res) => {
					if (JSON.parse(res.data).cate != 1) {
						return;
					}

					var userInfo = uni.getStorageSync("userInfo");
					if (JSON.parse(res.data).type == "history") {
						that.parseMsg(res.data)
						if (that.historyPage == 1) {
							that.scrollBottom()
						}
						var data = JSON.parse(res.data).last_gift_data;
						if (data == null) {
							return;
						}
						if (userInfo.id != data.user_id) {
							if (data.readtime == null) {
								if (data.type == "gift") {
									that.showSvga = true;
									that.$nextTick(() => {
										that.giftList.forEach((val, index) => {
											if (val.id == data.gift_id) {
												var setTime1 = setTimeout(() => {
													that.gift = val;
													that.handleGiftPlay()
													that.handleTextSend()
													clearTimeout(setTime1)
													that.scrollBottom()
												}, 500)
											}
										})
									})
								}
							}
						}
					} else {
						if (JSON.parse(res.data).data.user_id == userInfo.id || JSON.parse(res.data).data
							.user_id == that.$Route.query.user_id) {
							this.unread(); //后台标记已读
							this.parseMsg(res.data);
						}
						that.scrollBottom()
					}
				})
			},
			//后台标记已读
			unread() {
				var that = this;
				let params = {
					type: "read",
					to_user_id: that.$Route.query.user_id, //接收者的id,
				};
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("webscoket后台标记已读");
					},
					fail() {
						console.log("webscoket后台标记已读");
					}
				});
			},
			//去重
			deWeight(arr) {
				var a = 0;
				var newArr = []
				for (var i = 0; i < arr.length - 1; i++) {
					for (var j = i + 1; j < arr.length; j++) {
						if (arr[i].data.user.id == arr[j].data.user.id) {
							arr.splice(i, 1);
							a++;
							//因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
							j--;
						}
					}
				}
				return arr;
			},
			//scroll下拉
			scrollTop() {
				console.log("fei")
				var that = this;
				that.scrollFlag = true;
				that.historyPage++;
				that.fei_getMessageList(this.historyPage)
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height
				})
			},
			// 获得焦点后
			focus(e) {
				this.scrollBottom();
				this.watchKeyboard()
				this.showRecord = false;
				this.showEmoji = false;
				this.showGift = false;
				this.showPlus = false;
				// 可用区域高度减去软键盘高度，最后加上px转为字符串
			},
			// 失去焦点后
			blur() {
				this.pageHeight = 0
			},
			init() {
				let that = this
				that.$api('chat.single', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.chat = res.data;
						if (res.data.send_message != '') {
							that.sendMessage(res.data.send_message)
						}
						uni.setStorageSync('CHATSESSIONID', res.data.session_id)
						// 监听消息
						that.fei_getMessageList(that.historyPage)
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

			//获取历史记录
			fei_getMessageList(page) {
				let that = this
				let params = {
					type: 'history',
					msg: 'send',
					data: '',
					page: page,
					to_user_id: that.$Route.query.user_id, //接收者的id,
				}
				console.log(params)
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("webscoket发送信息成功");
						that.sendStr = "";
					},
					fail() {
						console.log("webscoket发送信息失败");
					}
				});
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
				let that = this;
				let msg = JSON.parse(message);
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
						case 'gift':
							that.giftList.forEach((val, index) => {
								if (val.id == msg.data.gift_id) {
									that.gift = val;
									that.handleGiftPlay()
									that.handleTextSend()
								}
							})
							that.messageList.push(msg.data)
							that.scrollBottom()
							break
						case 'history':
							if (that.historyPage == 1) {
								that.messageList = msg.data
								that.messageList.sort((a, b) => {
									return a.createtime - b.createtime
								})
							} else {
								that.scrollFlag = false;
								that.messageList.unshift(...msg.data)
								// that.messageList = [...that.messageList, ...msg.data.data];
								that.loadingmMore = true;
								that.messageList.sort((a, b) => {
									return a.createtime - b.createtime
								})
								if (msg.data.length == 0) {
									that.isScrollDown = false;
								}
							}
							break
						default:
					}
				} else {
					that.$u.toast('连接错误：' + msg.msg)
				}
			},
			// 发送服务数据
			sendMessage(data, type = 'text', gift_id = "") {
				let that = this;
				let params = {
					type: type,
					msg: 'send',
					data: data,
					gift_id: gift_id,
					to_user_id: that.$Route.query.user_id //接收者的id,
				}
				console.log("-------发送消息----------")
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("webscoket发送信息成功");
						that.sendStr = "";
					},
					fail() {
						console.log("webscoket发送信息失败");
					}
				});
			},
			backUrl() {
				var that = this;
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
				// uni.navigateTo();
			},
			//发送文本消息
			handleTextSend() {
				let that = this;
				if (that.text === '') {
					return
				} else {
					// that.$api('user_black.lists').then(res => {
					// 	if (res.code == 1) {
					// 		var result = res.data.filter((res, index) => {
					// 			return res.black_user_id == that.$Route.query.user_id ? true : false;
					// 		})
					// 		if (result.length == 0) {
					// 			console.log("fei")
					// 			that.showEmoji = false;
					// 			that.sendMessage(that.text, 'text');
					// 			that.text = '';
					// 		} else {
					// 			that.$u.toast('对方在黑名单内');
					// 		}
					// 	}
					// })
					// that.showEmoji = false;
					that.sendMessage(that.text, 'text');
					that.text = '';
				}
			},
			handleEmoji() {
				this.scrollBottom()
				let that = this
				that.showEmoji = !that.showEmoji
				that.showRecord = false
				that.showPlus = false
				that.showGift = false
			},
			async handleVoice() {
				let that = this
				var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				if (result == 1) {
					this.scrollBottom();
					that.showRecord = !that.showRecord
					that.showEmoji = false
					that.showPlus = false
					that.showGift = false
					return
				} else {
					uni.showModal({
						title: "请开启录音权限",
						content: "请去设置里面开启录音权限！",
						success(res1) {
							if (res1.confirm) {
								permision.gotoAppPermissionSetting()
							}
						}
					})
				}
			},
			handlePlus() {
				let that = this
				that.scrollBottom()
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
				let that = this;
				that.gift = item;
				that.sending(item);
			},
			sending(item) {
				var that = this;
				that.$api("gift.giveGift", {
					"receiver_user_id": that.$Route.query.user_id,
					"nums": 1,
					"gift_id": item.id
				}).then(data => {
					if (data.code == 1) {
						if (data.msg == "赠送成功") {
							that.sendMessage(that.gift.image, 'gift', item.id)
							// that.showGift = false;
							that.showSvga = true
							// that.handleGiftPlay()
							that.handleTextSend();
						}
					} else {
						that.recharge = true;
					}
				})
			},
			handleGiftPlay() {
				let that = this;
				that.showSvga = true;
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
				that.$api('user.profile', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						if (res.data == null) {
							uni.showToast({
								icon: "none",
								title: "用户已注销"
							})
							return;
						}
						if (res.data.role.realname != null && res.data.role.realname != '') {
							that.name = res.data.role.realname + "·" + res.data.role.dynasty
						} else {
							that.name = "无名氏"
						}
						that.user = res.data;
					}
				})
			},
			async getEmojiList() {
				let that = this
				if (uni.getStorageSync('EMOJILIST')) {
					that.emojiList = uni.getStorageSync('EMOJILIST')
				} else {
					that.emojiList = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍',
						'😘', '🥰', '😗', '😙', '🥲', '😚', '🙂', '🤗', '🤩', '🤔', '🫡', '🤨', '😐', '😑', '😶',
						'🫥', '😶‍🌫️', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌',
						'😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🫤', '🙃', '🫠', '🤑', '😲', '☹️', '🙁',
						'😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😮‍💨', '😰',
						'😱', '🥵', '🥶', '😳', '🤪', '😵', '😵‍💫', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕',
						'🤢', '🤮', '🤧', '😇', '🥳', '🥸', '🥺', '🥹', '🤠', '🤡', '🤥', '🤫', '🤭', '🫢', '🫣',
						'🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '👾', '🤖', '💩', '😺', '😸',
						'😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '🐵', '🐶', '🐺', '🐱', '🦁',
						'🐯', '🦒', '🦊', '🦝', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐻‍❄️', '🐨', '🐼',
						'🐸', '🦓', '🐴', '🦄', '🐔', '🐲', '🐽', '🐾', '🐒', '🦍', '🦧', '🦮', '🐕‍🦺', '🐩',
						'🐕', '🐈', '🐈‍⬛', '🐅', '🐆', '🐎', '🦌', '🦬', '🦏', '🦛', '🐂', '🐃', '🐄', '🐖', '🐏',
						'🐑', '🐐', '🐪', '🐫', '🦙', '🦘', '🦥', '🦨', '🦡', '🐘', '🦣', '🐁', '🐀', '🦔', '🐇',
						'🐿️', '🦫', '🦎', '🐊', '🐢', '🐍', '🐉', '🦕', '🦖', '🦦', '🦈', '🐬', '🦭', '🐳', '🐋',
						'🐟', '🐠', '🐡', '🦐', '🦑', '🐙', '🦞', '🦀', '🐚', '🪸', '🦆', '🐓', '🦃', '🦅', '🕊️',
						'🦢', '🦜', '🦩', '🦚', '🦉', '🦤', '🪶', '🐦', '🐧', '🐥', '🐤', '🐣', '🦇', '🦋', '🐌',
						'🐛', '🦟', '🪰', '🪱', '🦗', '🐜', '🪳', '🐝', '🪲', '🐞', '🦂', '🕷️', '🕸️', '🦠',
						'🧞‍♀️', '🧞‍♂️', '🧞', '🧟‍♀️', '🧟‍♂️', '🧟', '🧌', '🗣️', '👤', '👥', '🫂', '👁️', '👀',
						'🦴', '🦷', '👅', '👄', '🫦', '🧠', '🫀', '🫁', '🦾', '🦿', '👣', '🤺', '⛷️'
					]
					uni.setStorageSync('EMOJILIST', that.emojiList)

				}
			},
			getGiftList() {
				let that = this
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
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
				if (that.audioStatus) {
					that.$nextTick(function() {
						that.audio.play()
						that.audio.onEnded((e) => {
							that.audioStatus = false
						})
					})
				} else {
					that.$nextTick(function() {
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
				// #ifdef APP-PLUS || MP-WEIXIN
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
				// #endif
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
				var token = uni.getStorageSync("token");
				that.recording = false
				clearInterval(that.recordTimer)
				uni.uploadFile({
					url: that.$API_URL + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
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
				var token = uni.getStorageSync("token");
				getApp().globalData.isSelectImage = true;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: that.$API_URL + 'index/upload',
								filePath: item,
								name: 'file',
								formData: {
									"token": token
								},
								success: res => {
									res = JSON.parse(res.data)
									if (res.code === 1) {
										getApp().globalData.isSelectImage = false;
										that.sendMessage(res.data.fullurl, 'image')
									} else {
										that.$u.toast(res.msg)
									}
								},
								complete: e => {}
							})
						})
					}
					// that.cos.putObject({
					// 	Bucket: 'yaji-1318192409',
					// 	/* 填入您自己的存储桶，必须字段 */
					// 	Region: 'ap-shanghai',
					// 	/* 存储桶所在地域，例如ap-beijing，必须字段 */
					// 	Key: "chat/images/" + res.tempFiles[0].name,
					// 	/* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
					// 	Body: res.tempFiles[0],
					// 	/* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
					// 	Headers: {
					// 		"Content-Type": "image/jpeg"
					// 	},
					// 	onProgress: function(progressData) {
					// 		console.log(JSON.stringify(progressData));
					// 	}
					// }, function(err, data) {
					// 	if (data.statusCode == 200) {
					// 		that.sendMessage("https://" + data.Location, 'image')
					// 	} else {
					// 		that.$u.toast(res.msg)
					// 	}
					// });
					// --------------------------------------
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