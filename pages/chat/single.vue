<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="single">
		<u-navbar id="navbar" title="qwe" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({type: 'navigateBack',delta: 1})"></i>
			</view>
			<view slot="center" style="display: flex;align-items: center;">
				<image mode="aspectFill" :src="toUserData.avatar"
					style="width:50rpx;height:50rpx;border-radius:50%;margin-right: 10rpx;">
				</image>{{toUserData.name}}
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
		<!-- <view
			style="width: 88rpx;height: 88rpx;border-radius: 15rpx;position: fixed;right: 30rpx;z-index: 999999999999;box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.302);"
			:style="{bottom:floatHeight+'%'}" @click="floatClick">
			<image style="width: 100%;height: 100%;"
				src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/gift/giftIcon.png" mode="">
			</image>
		</view> -->
		<scroll-view class="chatContainer" id="chatContainer" :scroll-into-view="scrollTop" @click="boxClick"
			scroll-y="true" show-scrollbar="false" :scroll-with-animation="false" v-show="slideShow"
			:refresher-enabled="isScrollDown" :refresher-triggered="scrollFlag" @refresherrefresh="refresher"
			refresher-background="#F7F7F7" :style="{visibility:showMsg?'':'hidden'}">
			<view v-show="showSvga" id="svgaPlayer"
				style="z-index: 99999;box-sizing: border-box;position: fixed;top:0;left: 0;width: 100%;height: 100%;">
				<l-svga ref="svgaPlayer" style="width: 100%;height: 100%;box-sizing: border-box;"></l-svga>
			</view>
			<view style="padding: 0rpx 30rpx;box-sizing: border-box;padding-bottom: 100rpx;">
				<block v-for="(item,index) in chatMsgList" :key="index">
					<!-- 时间 -->
					<view class="text-center" style="padding-top: 10rpx;">
						<text
							class="p-1 px-2 rounded text-xs leading-none text-gray-400 bg-gray-50">{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM') }}</text>
					</view>
					<!-- 左边 -->
					<view class="chatLeft mt-6" :id="index==0?'scrollLeftTop':''"
						v-if="item.user_id == $Route.query.user_id">
						<view class="flex">
							<image mode="aspectFill" class="block rounded-full w-10 h-10 mr-3" sty
								:src="item.avatar || '/static/avatar.png'"
								@click="$u.route('/pages/user/home',{user_id:item.user_id})">
							</image>
						</view>
						<view>
							<view v-if="item.type === 'text'"
								class="rounded-3xl rounded-tl-none p-3  bg-gradient-to-r to-fuchsia-500 whitespace-pre-wrap"
								style="background: #fff;color: #323232;margin-right: 90rpx;font-size: 32rpx;">
								{{ item.content }}
							</view>
							<view v-if="item.type === 'image'" @click="openImg">
								<u-album :urls="item.content.split(',')" multipleSize="150" @imgLoad="imgLoad"
									rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'gift'" @click="openImg">
								<u-album :urls="item.content.split(',')" multipleSize="150" @imgLoad="imgLoad"
									rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'audio'" @click="handlePlayAudio(item,index)"
								class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
								<block v-if="item.isPlay==false">
									<view class="ri-voiceprint-line" style="color: #fff;" v-for="(item,index) in 3"
										:key="index">
									</view>
								</block>
								<block v-else>
									<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;"
										v-if="item.isPlay == true">
									</image>
								</block>
							</view>
						</view>
					</view>
					<!-- 右边 -->
					<view class="chatRight mt-6" :id="index==0?'scrollRightTop':''" v-else>
						<view>
							<view v-if="item.type === 'text'"
								class="rounded-3xl rounded-tr-none p-3  text-white bg-gradient-to-r  to-fuchsia-500 whitespace-pre-wrap"
								style="background: #FF6D93;max-width:80%;margin-left: 90rpx;font-size: 32rpx;">
								{{ item.content }}
							</view>
							<view v-if="item.type === 'image'" @click="openImg">
								<u-album :urls="item.content.split(',')" multipleSize="150" @imgLoad="imgLoad"
									rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'gift'" @click="openImg">
								<u-album :urls="item.content.split(',')" multipleSize="150" @imgLoad="imgLoad"
									rowCount="1"></u-album>
							</view>
							<view v-if="item.type === 'audio'" @click="handlePlayAudio(item,index)"
								class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
								<block v-if="item.isPlay==false">
									<view class="ri-voiceprint-line" style="color: #fff;" v-for="(item,index) in 3"
										:key="index">
									</view>
								</block>
								<block v-else>
									<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;"
										v-if="item.isPlay == true">
									</image>
								</block>
							</view>
						</view>
						<view class="flex">
							<image mode="aspectFill" class="block rounded-full w-10 h-10 ml-3"
								:src="item.avatar || '/static/avatar.png'">
							</image>
						</view>
					</view>
				</block>
			</view>
			<view id="scrollBottom" style="height: 20rpx;"></view>
		</scroll-view>
		<!-- 底部 -->
		<view class="singleFooter" style="position: relative;">
			<view v-if="flower.length!=0"
				style="width: 47.95rpx;height: 73.08rpx;border-radius: 15rpx;position: absolute;right: 60rpx;top: -100rpx;"
				:style="{bottom:floatHeight+'%'}" @click="floatClick">
				<view style="position: relative;">
					<image style="width: 47.95rpx;height: 73.08rpx;" :src="flower.image" mode="heightFix">
					</image>
					<text
						style="color: #F37B1A;font-size: 23.97rpx;position: absolute;right: -28rpx;bottom: 5rpx;">x{{flower.nums}}</text>
				</view>
			</view>
			<view class="flex p-4" style="width: 100%;box-sizing: border-box;">
				<view class="mr-4 flex items-center" @click="handleVoice">
					<image src="@/static/laba.png" style="width: 49rpx;height: 49rpx;" mode=""></image>
					<!-- <i class="ri-mic-2-fill block text-4xl leading-none text-gray-400"></i> -->
				</view>
				<view style="flex: 1;position: relative;display: flex;background: #F8F8F7;border-radius: 5rpx;"
					class="mr-4">
					<textarea class="" :auto-height="true" @blur="blur" :auto-blur="false" @focus="focus"
						@confirm="handleTextSend" :adjustPosition="false"
						style="padding:20rpx;border-radius: 10rpx;font-size:28rpx;color: rgb(48, 49, 51);width: 100%;box-sizing: border-box;"
						placeholder="说点什么吧" v-model="text"
						placeholder-style="color: rgb(192, 196, 204);font-size:30rpx"></textarea>
					<view class="mr-4 flex items-center" @click="handleEmoji">
						<image src="@/static/biaoqing.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
						<!-- <i class="ri-emotion-fill block text-4xl leading-none text-gray-400"></i> -->
					</view>
				</view>
				<view class="flex items-center mr-4 " @click="handleImage">
					<image src="@/static/tupian.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
					<!-- <i class="ri-image-fill text-4xl leading-none text-gray-400"></i> -->
				</view>
				<view class="flex items-center" v-if="!text" @click="showGiftClick">
					<image src="@/static/liwu3.png" style="width: 56rpx;height: 56rpx;" mode=""></image>
					<!-- <i class="ri-gift-fill text-4xl leading-none text-gray-400"></i> -->
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
					<text class="leading-none" style="font-size: 55rpx;">{{ item }}</text>
				</view>
			</view>
			<!-- 礼物 -->
			<view v-if="showGift" class="bg-gray-100 h-60 overflow-y-scroll">
				<view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 ">
					<view v-for="(item, index) in giftList" :key="index" :item="item" v-if="item.status!='hidden'">
						<view class="flex flex-col items-center" @click="handleGiftSend(item)">
							<view style="overflow: hidden;" class="w-20 h-20">
								<image class="block" style="width: 100%;height: 100%;" :src="item.image"
									lazy-load="false"></image>
							</view>

							<text class="mt-1">{{ item.title }}</text>
							<view style="margin-top: 20rpx;display: flex;align-items: center;">
								<image style="width: 20rpx;height: 20rpx;" src="@/static/qian.png" mode=""></image>
								<text style="font-size: 20rpx;color: #808080;margin-left: 5rpx;">{{ item.price }}</text>
							</view>
						</view>
					</view>
				</view>
				<view
					style="display: flex;flex-direction: row;justify-content: end;padding-top: 30rpx;margin-right: 27rpx;">
					<view style="display: flex;align-items: center;margin-right: 20rpx;">
						<image style="width: 20rpx;height: 20rpx;" src="@/static/qian.png" mode=""></image>
						<text style="font-size: 20rpx;color: #808080;margin-left: 5rpx;">{{userInfoData.money}}</text>
					</view>
					<view style="display: flex;align-items: center;font-size: 23rpx;color: #FE4373;"
						@click="$u.route('/pages/mine/recharge')">
						<text>马上充值</text>
						<text class="ri-arrow-right-s-line" style="font-size: 35rpx;"></text>
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
		<topPrompt></topPrompt>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import permision from "@/js_sdk/wa-permission/permission.js"
	import reward from "@/components/fei-reward/fei-reward.vue"
	export default {
		name: 'single',
		components: {
			reward
		},
		data() {
			return {
				scrollAnimation: false,
				toUserData: {
					"avatar": "",
					"name": ""
				},
				chatMsgList: [],
				giftList: [],
				scrollTop: "",
				slideShow: true,
				showRecord: false,
				showEmoji: false,
				showPlus: false,
				showGift: false,
				showSvga: false,
				text: '',
				pageHeight: 0,
				recordTip: "按住说话",
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
				audio: uni.createInnerAudioContext(),
				giftIsShow: false,
				recharge: false,
				isScrollDown: true,
				scrollFlag: true,
				historyPage: 1,
				emojiList: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍',
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
				],
				floatHeight: "15",
				userInfoData: [],
				flower: [],
				showMsg: false,
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		onLoad() {
			var that = this;
			this.getGiftList()
			this.getUserProfile();
			// this.initSocKet();
			// this.getChatList();
			this.watchKeyboard();
			this.watchRecorder()
			this.single()
			this.getUserInfo()
			this.getflower()
		},

		onShow() {
			var openImg = uni.getStorageSync("openImg")
			if (openImg == "") {
				let showTimeOut = setTimeout(() => {
					this.historyPage = 1;
					this.isScrollDown = true;
					this.scrollFlag = false;
					getApp().globalData.socketTask._callbacks.message.splice(1);
					this.$store.commit("setReceiverId", this.$Route.query.user_id)
					this.$nextTick(function() {
						this.chatMsgList = [];
						this.getChatList();
						this.initSocKet();
					})
					this.scrollBottom()
					clearTimeout(showTimeOut)
				}, 250)
			} else {
				uni.removeStorageSync("openImg")
			}
		},
		onHide() {
			this.showSvga = false;
			this.$store.commit("setReceiverId", "");
		},
		created() {
			var that = this;
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			that.$store.watch((state, getters) => {
				if (state.message.giftId != '') {
					if (page.route == "pages/chat/single") {
						that.giftIsShow = true;
					}
				}
			})
		},
		onUnload() {
			var that = this;
			this.$store.commit("setReceiverId", "");
			getApp().globalData.socketTask._callbacks.message.splice(1)
			this.audio.destroy()
			this.showSvga = false;
		},
		methods: {
			imgLoad() {
				this.scrollBottom()
			},
			getflower() {
				let that = this;
				that.$api("gift.is_flower").then(res => {
					if (res.code == 1) {
						that.flower = res.data;
					} else {
						that.flower = [];
					}
				})
			},
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.userInfoData = res.data;
					}
				})
			},
			floatClick() {
				var that = this;
				that.showPlus = false;
				that.showRecord = false;
				that.showEmoji = false;
				that.floatHeight = "40"
				that.$api("gift.giveGift", {
					"receiver_user_id": that.$Route.query.user_id,
					"nums": 1,
					"gift_id": that.flower.gift_id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.sendMessage(that.flower.only_flower_image, 'gift', that.flower.id);
						var obj = {
							avatar: that.userInfo.avatar,
							content: that.flower.only_flower_image,
							createtime: that.getDate(),
							type: "gift",
							user_id: that.userInfo.id,
						};
						that.chatMsgList.push(obj);
						that.scrollBottom()
						that.getflower()
					}
				})
				that.scrollBottom();
			},
			openImg() {
				uni.setStorageSync("openImg", true);
			},
			single() {
				let that = this
				that.$api('chat.single', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						if (res.data.send_message != '') {
							var poetryItem = uni.getStorageSync("poetryItem");
							if (poetryItem == '') {
								var obj = {
									avatar: that.userInfo.avatar,
									content: res.data.send_message,
									createtime: that.getDate(),
									type: "text",
									user_id: that.userInfo.id,
								};
								that.chatMsgList.push(obj);
								that.sendMessage(res.data.send_message, 'text');
								that.scrollBottom()
							} else {
								that.poetry()
							}
						}
						uni.setStorageSync('CHATSESSIONID', res.data.session_id)
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			boxClick() {
				this.showRecord = false;
				this.showEmoji = false;
				this.showPlus = false;
				this.showGift = false;
				this.floatHeight = "15"
			},
			//下拉刷新
			refresher() {
				var that = this;
				that.scrollFlag = true;
				that.historyPage++;
				that.getChatList()
				that.$nextTick(() => {
					that.scrollLeftTop()
					that.scrollRightTop()
				})

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
							var obj = {
								avatar: that.userInfo.avatar,
								content: res.msg,
								createtime: that.getDate(),
								type: "text",
								user_id: that.userInfo.id,
							};
							that.chatMsgList.push(obj);
							that.sendMessage(res.msg, 'text');
						} else {}
						uni.removeStorageSync("poetryItem");
					})
				}
			},
			//礼包
			changend() {
				this.giftIsShow = false;
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
			//初始化socket
			initSocKet() {
				var that = this;
				getApp().globalData.socketTask.onMessage((res) => {
					if (JSON.parse(res.data).cate != 1) {
						return;
					}
					var socketData = JSON.parse(res.data);
					that.unread()
					if (socketData.type == "history") {
						var list = socketData.data;
						var list2 = [];
						if (that.historyPage != 1) {
							if (socketData.data.length == 0) {
								that.isScrollDown = false;
								return;
							} else {
								list.unshift(...that.chatMsgList);
								that.scrollFlag = false;

							}

						}
						list.sort((a, b) => {
							return a.createtime - b.createtime
						})
						list.forEach((val, index) => {
							list2.push({
								avatar: val.avatar,
								content: val.content,
								createtime: val.createtime,
								type: val.type,
								user_id: val.user_id,
								isPlay: false
							})
						})
						that.chatMsgList = list2;
						that.showMsg = true;
						if (that.historyPage == 1) {
							that.scrollBottom();
						}

						//------
						var data = JSON.parse(res.data).last_gift_data;
						if (data == null) {
							return;
						}
						if (socketData.last_gift_data.readtime == null) {
							if (data.type == "gift") {
								that.$nextTick(() => {
									that.$api('gift.lists').then(giftRes => {
										if (giftRes.code === 1) {
											giftRes.data.forEach((val, index) => {
												if (val.id == data.gift_id) {
													that.showSvga = true;
													var setTime1 = setTimeout(() => {
														if (val.url != null) {
															that.gift = val;
															that.handleGiftPlay()
															clearTimeout(setTime1)
															that.scrollBottom()
														}
													}, 200)
												}
											})
										}
									})
								})
							}
						}
					} else if (socketData.type == "text") {
						if (socketData.data.user_id == that.$Route.query.user_id) {
							that.scrollAnimation = true;
							that.chatMsgList.push(socketData.data);
							that.scrollBottom();
						}
					} else if (socketData.type == "image") {
						if (socketData.data.user_id == that.$Route.query.user_id) {
							that.scrollAnimation = true;
							that.chatMsgList.push(socketData.data);
							that.scrollBottom();
						}
					} else if (socketData.type == "gift") {
						if (socketData.data.user_id == that.$Route.query.user_id) {
							that.giftList.forEach((val, index) => {
								if (val.id == socketData.data.gift_id) {
									that.gift = val;
									that.handleGiftPlay()
								}
							})
							that.scrollAnimation = true;
							that.chatMsgList.push(socketData.data);
							that.scrollBottom();
						}
					} else if (socketData.type == "audio") {
						if (socketData.data.user_id == that.$Route.query.user_id) {
							var list = socketData.data;
							list.isPlay = false;
							that.scrollAnimation = true;
							that.chatMsgList.push(list);
							that.scrollBottom();
						}
					}
				})
			},
			//获取聊天信息
			getChatList() {
				var that = this;
				let params = {
					type: 'history',
					msg: 'send',
					data: '',
					page: that.historyPage,
					to_user_id: this.$Route.query.user_id, //接收者的id,
				}
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("获取历史聊天记录成功");
					},
					fail() {
						console.log("获取历史聊天记录失败");
					}
				});
			},
			//发送文本消息
			handleTextSend() {
				let that = this;
				if (that.text === '') {
					return
				} else {
					that.scrollAnimation = true;
					var obj = {
						avatar: that.userInfo.avatar,
						content: that.text,
						createtime: that.getDate(),
						type: "text",
						user_id: that.userInfo.id,
					};
					that.chatMsgList.push(obj);
					that.sendMessage(that.text, 'text');
					that.text = '';
					that.scrollBottom()
				}
			},
			//发送socket信息
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
			//播放语音
			handlePlayAudio(item, index) {
				let that = this
				if (!item.content) {
					that.$u.toast('语音不能为空');
					return false
				} else {
					that.audio.destroy();
					that.chatMsgList.forEach((val, index) => {
						val.isPlay = false;
					})
					that.audio = uni.createInnerAudioContext()
					that.audio.src = item.content;
					that.chatMsgList[index].isPlay = true;
					that.audio.play()
					that.audio.onEnded((e) => {
						that.chatMsgList[index].isPlay = false;
					})
				}
			},
			//监听录音
			watchRecorder() {
				var that = this;
				that.recorder.onStart((e) => {
					that.recordStart(e)
				})
				that.recorder.onStop((e) => {
					that.recordStop(e)
				})
			},
			showGiftClick() {
				var that = this;
				that.showGift = !that.showGift;
				that.showEmoji = false;
				that.showPlus = false;
				that.showRecord = false;
			},
			//表情
			handleEmoji() {
				var that = this;
				that.showRecord = false;
				that.showEmoji = !that.showEmoji;
				that.showPlus = false
				that.showGift = false;
				that.floatHeight = that.showEmoji == true ? '40' : "15"
				that.scrollBottom()
			},
			handleEmojiSend(item) {
				let that = this
				that.text += item
			},
			//礼物
			handleGift() {
				let that = this
				that.showGift = !that.showGift
				that.showPlus = false
			},
			//礼物列表
			getGiftList() {
				let that = this
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
			},
			handleGiftSend(item) {
				let that = this;
				that.gift = item;
				that.$api("gift.giveGift", {
					"receiver_user_id": that.$Route.query.user_id,
					"nums": 1,
					"gift_id": item.id
				}).then(data => {
					if (data.code == 1) {
						if (data.msg == "赠送成功") {
							that.getUserInfo()
							that.sendMessage(that.gift.image, 'gift', item.id);
							that.scrollAnimation = true;
							var obj = {
								avatar: that.userInfo.avatar,
								content: that.gift.image,
								createtime: that.getDate(),
								type: "gift",
								user_id: that.userInfo.id,
							};
							that.chatMsgList.push(obj);
							that.scrollBottom()
							if (item.url != null) {
								that.handleGiftPlay();
							}
						}
					} else {
						that.recharge = true;
					}
				})
			},
			//播放礼物动画
			handleGiftPlay() {
				let that = this;
				that.showSvga = true;
				that.$refs.svgaPlayer.render(async (parser, player) => {
					let videoItem = await parser.load(that.gift.url);
					await player.setVideoItem(videoItem)
					player.loops = 1;
					player.setContentMode(that.gift.is_full_screen == 1 ? "AspectFill" : "AspectFit")
					player.startAnimation();

					player.onFinished(() => {
						that.showSvga = false
					})
				})
			},
			//录音
			async handleVoice() {
				let that = this;
				var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				if (result == 1) {
					this.scrollBottom();
					that.showRecord = !that.showRecord
					that.showEmoji = false;
					that.showPlus = false;
					that.showGift = false;
					that.floatHeight = that.showRecord == true ? '40' : "15"
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
							that.scrollAnimation = true;
							var obj = {
								avatar: that.userInfo.avatar,
								content: res.data.fullurl,
								createtime: that.getDate(),
								type: "audio",
								user_id: that.userInfo.id,
								isPlay: false,
							};
							that.chatMsgList.push(obj);
							that.scrollBottom()
						} else {
							that.$u.toast(res.msg)
						}
					},
					complete: e => {}
				})
			},
			//发送图片
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
										that.sendMessage(res.data.fullurl, 'image');
										that.scrollAnimation = true;
										var obj = {
											avatar: that.userInfo.avatar,
											content: res.data.fullurl,
											createtime: that.getDate(),
											type: "image",
											user_id: that.userInfo.id,
										};
										that.chatMsgList.push(obj);
										that.scrollBottom()
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
			//更多
			handlePlus() {
				let that = this
				that.scrollBottom()
				that.showPlus = !that.showPlus
				that.showRecord = false
				that.showEmoji = false;
				that.showGift = false;
				that.floatHeight = that.showPlus == true ? '40' : "15"
				// that.showGift = false
			},
			// 获得焦点后
			focus(e) {
				this.scrollBottom();
				this.showRecord = false;
				this.showEmoji = false;
				this.showGift = false;
				this.showPlus = false;
				// 可用区域高度减去软键盘高度，最后加上px转为字符串
			},
			// 失去焦点后
			blur() {
				this.pageHeight = 0;
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height;
					if (res.height == 0) {
						that.floatHeight = "15";
					} else {
						that.floatHeight = "50";
					}
				})
			},
			//获取聊天对象信息
			getUserProfile() {
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
							that.toUserData.name = res.data.role.realname + "·" + res.data.role.dynasty
						} else {
							that.toUserData.name = "无名氏"
						}
						that.toUserData.avatar = res.data.avatar
					}
				})
			},
			scrollBottom() {
				let that = this
				let timeout = null
				that.scrollTop = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollTop = 'scrollBottom';
				}, 100)
			},
			scrollLeftTop() {
				let that = this
				let timeout = null
				that.scrollTop = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollTop = 'scrollLeftTop';
				}, 50)
			},
			scrollRightTop() {
				let that = this
				let timeout = null
				that.scrollTop = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollTop = 'scrollRightTop';
				}, 300)
			},
			//获取时间戳
			getDate() {
				var tmp = Date.parse(new Date()).toString();
				tmp = tmp.substr(0, 10);
				return tmp;
			}
		}
	}
</script>
<style>
	.single {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.chatContainer {
		height: 0;
		flex: 1;
		background: #F7F7F7;
		box-sizing: border-box;
		position: relative;
	}

	.chatContainer::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.chatLeft {
		display: flex;
	}

	.chatRight {
		display: flex;
		justify-content: flex-end;
	}
</style>