<template>
	<view class="poetry">
		<u-navbar title="曲水流觞" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="poetryBox">
			<view class="position" v-for="(item,index) in 6">
				<view>
					<image class="positionImg"
						src="https://axhub.im/ax10/2b3b58ba49e03e44/images/%E6%9B%B2%E6%B0%B4%E6%B5%81%E8%A7%9E-%E8%BF%9B%E5%85%A5/u26.svg">
					</image>
				</view>
				<view class="positionText">空位</view>
			</view>
			<view class="tipsBox">
				1
			</view>
			<image src="/static/beizi.png" :animation="animationData" :class="fei_AnimationName" class="cup"></image>
		</view>
		<view class="poetryFooter">
			<input type="text" v-model="valueA">
			<button type="button" @click="aaaaa">点我</button>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	var animation = uni.createAnimation({
		duration: "2000",
		timingFunction: "linear",
	});
	export default {
		data() {
			return {
				valueA: "",
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
				emojiList: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗',
					'😙', '🥲', '😚', '🙂', '🤗', '🤩', '🤔', '🫡', '🤨', '😐', '😑', '😶', '🫥', '😶‍🌫️', '🙄', '😏',
					'😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓',
					'😔', '😕', '🫤', '🙃', '🫠', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦',
					'😧', '😨', '😩', '🤯', '😬', '😮‍💨', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😵‍💫', '🥴',
					'😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥸', '🥺', '🥹', '🤠', '🤡',
					'🤥', '🤫', '🤭', '🫢', '🫣', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '👾',
					'🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '🐵', '🐶',
					'🐺', '🐱', '🦁', '🐯', '🦒', '🦊', '🦝', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐻‍❄️', '🐨',
					'🐼', '🐸', '🦓', '🐴', '🦄', '🐔', '🐲', '🐽', '🐾', '🐒', '🦍', '🦧', '🦮', '🐕‍🦺', '🐩', '🐕',
					'🐈', '🐈‍⬛', '🐅', '🐆', '🐎', '🦌', '🦬', '🦏', '🦛', '🐂', '🐃', '🐄', '🐖', '🐏', '🐑', '🐐',
					'🐪', '🐫', '🦙', '🦘', '🦥', '🦨', '🦡', '🐘', '🦣', '🐁', '🐀', '🦔', '🐇', '🐿️', '🦫', '🦎',
					'🐊', '🐢', '🐍', '🐉', '🦕', '🦖', '🦦', '🦈', '🐬', '🦭', '🐳', '🐋', '🐟', '🐠', '🐡', '🦐',
					'🦑', '🐙', '🦞', '🦀', '🐚', '🪸', '🦆', '🐓', '🦃', '🦅', '🕊️', '🦢', '🦜', '🦩', '🦚', '🦉',
					'🦤', '🪶', '🐦', '🐧', '🐥', '🐤', '🐣', '🦇', '🦋', '🐌', '🐛', '🦟', '🪰', '🪱', '🦗', '🐜',
					'🪳', '🐝', '🪲', '🐞', '🦂', '🕷️', '🕸️', '🦠', '🧞‍♀️', '🧞‍♂️', '🧞', '🧟‍♀️', '🧟‍♂️', '🧟',
					'🧌', '🗣️', '👤', '👥', '🫂', '👁️', '👀', '🦴', '🦷', '👅', '👄', '🫦', '🧠', '🫀', '🫁', '🦾',
					'🦿', '👣', '🤺', '⛷️'
				],
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
				recordPoint: {
					identifier: 0,
					Y: 0
				},
				// -----------------
				fei_currentIndex: 1,
				animationData: {},
				fei_AnimationName: "",
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		onLoad() {
			let that = this;
			this.cupAnimation();
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
			aaaaa() {
				console.log(this.valueA)
				var that = this;
				var num = parseInt(this.valueA)
				switch (num) {
					case 1:
						that.fei_AnimationName = "cup1";
						break;
					case 2:
						that.fei_AnimationName = "cup2"
						break;
					case 3:
						that.fei_AnimationName = "cup3"
						break;
					case 4:
						that.fei_AnimationName = "cup4"
						break;
					case 5:
						that.fei_AnimationName = "cup5"
						break;
					case 6:
						that.fei_AnimationName = "cup6"
						break;
				}
				console.log(that.fei_AnimationName)
			},
			//动画
			cupAnimation(index) {
				var that = this;
				switch (index) {
					case 1:
						animation.left("13%").bottom("8%").step({
							duration: 500
						});
						that.animationData = animation.export()
						break;
					case 2:
						animation.left("65%").bottom("28%").step();
						that.animationData = animation.export()
						break;
					case 3:
						animation.left("65%").bottom("28%").scale(1).step({
							duration: 2000
						});
						animation.scale(0.1).left("16%").bottom("45%").scale(1).step({
							duration: 2000
						});
						that.animationData = animation.export()
						break;
					case 4:
						animation.left("65%").bottom("28%").scale(1).step({
							duration: 2000
						});
						animation.scale(0.1).left("16%").bottom("45%").scale(1).step({
							duration: 2000
						});
						animation.scale(0.1).left("66%").bottom("57%").scale(1).step({
							duration: 2000
						});
						that.animationData = animation.export()
						break;
				}
			},
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
				that.recordPoint.Y = e.touches[0].clientY
				that.recordPoint.identifier = e.touches[0].identifier
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
				if (that.recordPoint.Y - e.touches[0].clientY >= uni.upx2px(100)) {
					that.recordStoping = true
					that.recordTip = '松开手指，取消发送'
				}
			},
			async getProfile() {
				let that = this
				that.$api('user.profile', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.user = res.data
					}
				})
			},
			async getMessageList() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.user', {
					user_id: that.$Route.query.user_id
				}).then(res => {
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

<style scoped lang="scss">
	.poetry {
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.poetryBox {
		height: 80%;
		background: url(@/static/poetry.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.poetryFooter {
		height: 500rpx;
	}

	.position {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.position:nth-child(1) {
		position: absolute;
		left: 4%;
		top: 11%;
	}

	.position:nth-child(2) {
		position: absolute;
		right: 4%;
		top: 11%;
	}

	.position:nth-child(3) {
		position: absolute;
		left: 4%;
		top: 35%;
	}

	.position:nth-child(4) {
		position: absolute;
		right: 4%;
		top: 35%;
	}

	.position:nth-child(5) {
		position: absolute;
		left: 4%;
		top: 60%;
	}

	.position:nth-child(6) {
		position: absolute;
		right: 4%;
		top: 60%;
	}

	.positionImg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.positionText {
		font-size: 28rpx;
		color: #fff;
	}

	.tipsBox {
		height: 13%;
		background: rgba(255, 255, 255, 0.5);
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		box-sizing: border-box;
	}

	.cup {
		position: absolute;
		width: 110rpx;
		height: 80rpx;
		left: 0;
		bottom: 0;
		z-index: 5;
		transition: all 0.3s;
		
		animation-direction: normal;
		animation-timing-function: linear;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	.cup1 {
		animation-duration: 1s;
		animation-name: cup1;
	}

	.cup2 {
		animation-duration: 1.5s;
		animation-name: cup2;
	}

	.cup3 {
		animation-duration: 3s;
		animation-name: cup3;
	}

	.cup4 {
		animation-duration: 5s;
		animation-name: cup4;
	}

	.cup5 {
		animation-duration: 5s;
		animation-name: cup5;
	}

	.cup6 {
		animation-duration: 7s;
		animation-name: cup6;
	}

	@keyframes cup1 {
		form {
			left: 0%;
			bottom: 0%;
		}

		to {
			left: 28%;
			bottom: 14%;
		}
	}

	@keyframes cup2 {
		form {
			left: 0%;
			bottom: 0%;
		}

		to {
			left: 65%;
			bottom: 28%;
		}
	}

	@keyframes cup3 {
		0% {
			left: 0%;
			bottom: 0%;
		}

		50% {
			left: 65%;
			bottom: 28%;
			transform: scale(1);
		}

		90% {
			transform: scale(0.5);
		}

		97% {
			transform: scale(1);
		}

		100% {
			left: 16%;
			bottom: 45%;
		}
	}

	@keyframes cup4 {
		0% {
			left: 0%;
			bottom: 0%;
		}

		25% {
			left: 65%;
			bottom: 28%;
			transform: scale(1);
		}

		75% {
			left: 16%;
			bottom: 45%;
		}

		95% {
			bottom: 50%;
			transform: scale(0.7);
		}

		98% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(0.8);
			left: 65%;
			bottom: 57%;
		}
	}

	@keyframes cup5 {
		0% {
			left: 0%;
			bottom: 0%;
		}

		25% {
			left: 65%;
			bottom: 28%;
			transform: scale(0.7);
		}

		50% {
			transform: scale(0.8);
			left: 16%;
			bottom: 45%;
		}

		60% {
			transform: scale(0.7);
			bottom: 50%;
		}

		75% {
			transform: scale(0.8);
			left: 65%;
			bottom: 55%;
		}

		80% {
			left: 60%;
			bottom: 57%;
		}

		97% {
			transform: scale(0.6);
		}

		98% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(0.8);
			left: 17%;
			bottom: 75%;
		}
	}

	@keyframes cup6 {

		20% {
			left: 65%;
			bottom: 28%;

		}

		40% {
			left: 16%;
			bottom: 45%;
		}

		60% {
			left: 65%;
			bottom: 57%;
		}

		80% {
			left: 17%;
			bottom: 75%;
		}

		100% {
			left: 64%;
			bottom: 82%;
		}
	}
</style>