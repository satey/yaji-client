<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true"
			@click="$u.route({ type: 'navigateBack', delta: 1 })">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right" @click="showAction = true" v-if="userInfo.id != user_id">
				<i class="ri-more-fill " style="font-size: 38rpx;color: #333;"></i>
			</view>
		</u-navbar>
		<u-popup :show="showAction" @close="showAction = false" :closeable="true" :round="30">
			<view class="p-4">
				<!-- <view class="text-2xl text-center">操作</view> -->
				<view class="delete"
					@click="$u.route('/pages/public/report',{user_id:detailContent.user_id}), showAction = false"
					style="margin-top: 50rpx;">
					<!-- <i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i> -->
					<view style="font-size: 30rpx;">举报广告/色情等</view>
				</view>
				<view class="delete2" @click="showAction = false" style="margin-top: 20rpx;">
					<!-- <i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i> -->
					<view style="font-size: 30rpx;">取消</view>
				</view>
				<!-- <view class="grid grid-cols-5 gap-4 mt-6">
					<view class="text-center" @click="showFeedback = true, showAction = false">
						<i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i>
						<view class="text-base mt-2">举报</view>
					</view>
				</view> -->
			</view>
		</u-popup>
		<u-modal :show="followModule" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="确定" cancelText="取消" @cancel="followModule=false" @confirm="unfollow">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>是否取消关注？</text>
				</view>
			</view>
		</u-modal>
		<!-- 底部 -->
		<view class="fixed bottom-0 left-0 right-0 !border-t border-0 border-solid border-gray-100 bg-white"
			style="z-index: 90;" v-if="detailContent!=null">
			<view class="flex p-4">
				<view class="flex items-center" @click="showEmoji = !showEmoji">
					<i class="ri-emotion-fill text-4xl text-gray-500"></i>
				</view>
				<view class="flex-1 flex">
					<u-textarea v-model="message" :auto-blur="true" :focus="inputFocus" @focus="focus" @blur="blur"
						:autoHeight="true" :placeholder="placeholder" :adjustPosition="false" type="text"
						maxlength="200"></u-textarea>
				</view>
				<view class="flex items-center">
					<view
						class="p-3 rounded-full text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
						@click="doComment1()">发送</view>
				</view>
			</view>
			<!-- 表情 -->
			<view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
				<view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item"
					@click="handleEmojiSend(item)">
					<text class="leading-none" style="font-size: 1.8rem;">{{ item }}</text>
				</view>
			</view>
			<view class="sdasdas" :style="{height:pageHeight+'px'}"></view>
		</view>

		<!-- 内容 -->
		<view class="userContent" v-if="detailContent!=null">
			<view class="" v-if="detailContent!=null">
				<view class="userImg" v-if="userInfo.id == user_id"
					@click="$u.route('/pages/index/mine', { user_id: detailContent.user_id })">
					<image mode="aspectFill" :src="avatar || '/static/avatar.png'" class="userImg"></image>
				</view>
				<view v-else class="userImg" @click="$u.route('/pages/user/home', { user_id: detailContent.user_id })">
					<image mode="aspectFill" :src="avatar || '/static/avatar.png'" class="userImg"></image>
				</view>
			</view>
			<view v-else class="userImg" @click="showToast">
				<image mode="aspectFill" :src="avatar || '/static/avatar.png'" class="userImg"></image>
			</view>
			<view style="flex: 1;">
				<view class="userInfo">
					<view class="userNameBox">
						<view class="userName">{{ realname  }}</view>
						<view class="tags" v-if="achievements != ''">
							{{achievements.replace(/,/g,"&nbsp;&nbsp;")}}
						</view>
					</view>
					<view v-if="userInfo.id != user_id">
						<view class="follow" v-show='is_follow==0' @click="interest(1)">关注</view>
						<view class="followActive" v-show="is_follow==1" @click="interest(2)">已关注</view>
					</view>
				</view>
				<view class="detailsText">
					<text>{{ content || '' }}</text>
				</view>
				<view class="topic">
					<view class="topicItem" @tap="$u.route('/pages/user/topicspeed',{post_cate_id:item.id})"
						v-for="(item,index) in post.post_cate"><i class="ri-hashtag mr-1"></i>{{item.title}}</view>
				</view>
				<view v-if="post.images">
					<image v-for="(item,index) in images" :src="item" style="width: 100%;border-radius: 10rpx;"
						mode="widthFix" class="mt-4" @click="openImgs(index)"></image>
				</view>
				<view v-if="post.audio" @click="handlePlayAudio(post.audio)"
					class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
					<i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
				</view>
			</view>
		</view>
		<view class="comment" style="padding: 30rpx;" v-if="detailContent!=null">
			<view class="title" style="color: #323232;font-size: 28rpx;font-weight: bold;">全部评论({{post.commentnums }})
			</view>
			<view class="commentList">
				<uc-comment ref="comment" @reply="reply" @reply2="reply2"></uc-comment>
				<view style="height: 120rpx;"></view>
			</view>
		</view>
		<u-empty v-if="detailContent == null" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
			marginTop="100"></u-empty>
		<topPrompt></topPrompt>
	</view>
</template>
<script>
	export default {
		name: 'detail',
		components: {},
		data() {
			return {
				post: {
					user: {}
				},
				audio: null,
				audioStatus: false,
				video: null,
				videoStatus: false,
				listPostComment: [],
				params: {
					type: 'all',
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				inputFocus: false,
				placeholder: '发表评论',
				showEmoji: false,
				emojiList: [],
				message: '',
				post_id: null,
				post_comment_id: null,
				showAction: false,
				showFeedback: false,
				feedback: '',
				feedbackType: '',
				ListFeedbackType: ['色情低俗', '政治敏感', '造谣传谣', '广告欺诈', '侵犯权益', '其他'],
				isRed: false,
				isNoRed: true,
				// ------
				images: [],
				is_follow: '',
				user_id: "",
				userInfo: "",
				detailContent: null,
				realname: "",
				dynasty: "",
				achievements: '',
				avatar: "",
				content: "",
				followModule: false,
				pageHeight: 0,
				replyData: [],
				replyFalg: false,
				flagNum: 0,
				commentFlag: true,
			}
		},
		created() {
			let that = this
			that.getEmojiList()
			// that.isRedLove=false
		},
		onReachBottom() {
			this.$refs.comment.scrollBottom()
		},
		onLoad(option) {
			let that = this;
			that.userInfo = uni.getStorageSync("userInfo");
			that.getPostDetail()
			that.getPostComment()
			that.watchKeyboard();
			// that.getDigCommentDetail()
		},
		methods: {
			reply(e) {
				this.replyData = e;
				this.placeholder = `回复${e.role_realname}${e.role_dynasty}`;
				this.inputFocus = false;
				this.$nextTick(() => {
					this.inputFocus = true;
					this.flagNum = 1
				})
			},
			reply2(e) {
				console.log(e)
				this.replyData = e;
				this.placeholder = `回复${e.role_realname}${e.role_dynasty}`;
				this.inputFocus = false;
				this.$nextTick(() => {
					this.inputFocus = true;
					this.flagNum = 2
				})
			},
			// 获得焦点后
			focus(e) {},
			// 失去焦点后
			blur() {
				if (this.message.length != 0) {
					if (this.replyData.length != 0) {
						this.replyFalg = true;
					} else {
						this.replyFalg = false;
						this.replyData = []
						this.placeholder = '发表评论'
						this.flagNum = 0
					}
				} else {
					this.replyFalg = false;
					this.replyData = []
					this.placeholder = '发表评论'
					this.flagNum = 0
				}
				// this.placeholder = '发表评论'
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height
				})
			},
			//取消关注
			unfollow() {
				var that = this;
				that.$api('user_follow.follow', {
					user_id: that.user_id
				}).then(res => {
					if (res.code === 1) {
						console.log('取消成功');
						that.is_follow == 0;
						that.followModule = false;
						that.getUserProfile()
					} else {
						console.log('25');
					}
				})
			},
			showToast() {
				uni.showToast({
					icon: "none",
					title: "用户已注销"
				})
			},
			interest(type) {
				let that = this;
				if (type == 1) {
					that.$api('user_follow.follow', {
						user_id: that.user_id
					}).then(res => {
						that.is_follow == 1
						that.getUserProfile(that.user_id)
					})
				}
				if (type == 2) {
					console.log(that.followModule)
					that.followModule = true;
				}
			},
			//关注
			async getUserProfile(id) {
				let that = this
				// console.log(that.$Route.query.user_id);
				that.$api('user.profile', {
					user_id: id
				}).then(res => {
					if (res.code === 1) {
						if (res.data == null) {
							that.is_follow = 0;
							return;
						}
						that.is_follow = res.data.is_follow
					}
				})
			},

			//打开图片
			openImgs(index) {
				var that = this;
				uni.previewImage({
					current: index,
					urls: that.images
				})
			},
			// 删除动态
			// detailTrends(){
			// 	let that=this
			// 	uni.showModal({
			// 		content:'你确定要删除吗？？？',
			// 		cancelText:'取消',
			// 		confirmText:'确定'
			// 	})
			// 	// 	that.$api('post.del', { post_id:that.item.id }).then(res => {
			// 	// 	    if (res.code === 1) {
			// 	// 		console.log('删除成功');

			// 	// 		that.getPostMine()
			// 	// 		setTimeout(() => {
			// 	// 			this.$router.go(0)
			// 	// 		}, 500)
			// 	// 	    }
			// 	// 	})

			// },

			getPostDetail() {
				let that = this
				that.$api('post.detail', {
					post_id: that.$Route.query.post_id
				}).then(res => {
					if (res.code === 1) {
						if (res.data.user == null) {
							that.realname = "无名氏"
							that.avatar = ""
							that.achievements = "";
						} else {
							that.detailContent = res.data;
							that.realname = res.data.role.realname + ' · ' + res.data.role.dynasty;
							that.avatar = res.data.user.avatar
							that.dynasty = res.data.role.dynasty
							that.achievements = res.data.role.achievements;
						}
						that.content = res.data.content;
						that.user_id = res.data.user_id;
						that.post = res.data;
						that.images = res.data.images.split(",");
						that.getUserProfile(res.data.user_id)
						// // ---------
						// that.$api('user.info', {
						// 	user_id: res.data.user_id
						// }).then(data => {
						// 	if (data.code === 1) {
						// 		that.achievements = data.data.achievements;
						// 	} else {}
						// })
						// that.getUserProfile(res.data.user_id)
						// that.post = res.data;
						// that.images = res.data.images.split(",");
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						// that.postRecommendList = [...that.post, ...res.data]
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			async getPostComment() {
				let that = this
				that.loadmore = 'loading'
				that.$api('comment.lists', {
					post_id: that.$Route.query.post_id
				}).then(res => {
					if (res.code === 1) {
						// that.paginator.total = res.data.total
						// that.paginator.last_page = res.data.last_page
						// that.listPostComment = [...that.listPostComment, ...res.data.data]
						var list = res.data
						that.listPostComment = list;
						// if (that.params.page < res.data.last_page) {
						// that.loadmore = 'loadmore'
						// } else
						// that.loadmore = 'nomore'
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
			handlePlayVideo(video) {
				let that = this
				if (!video) {
					that.$u.toast('视频不能为空')
					return false
				}
				if (!that.video) {
					that.video = uni.createVideoContext('video')
					that.video.src = video
				}
				that.videoStatus = !that.videoStatus
				if (that.videoStatus) {
					that.$nextTick(function() {
						that.video.play()
					})
				} else {
					that.$nextTick(function() {
						that.video.pause()
					})
				}
			},
			handlePostDig() {
				let that = this
				that.$api('post.dig', {
					post_id: that.post.id
				}).then(res => {
					if (res.code === 1) {
						that.isRed = !that.isRed
						// that.isNoRed=false
						that.isNoRed = !that.isNoRed
						if (that.post.is_zan == 0) {
							that.$u.toast('点赞成功')
						} else {
							that.$u.toast('取消点赞')
						}
						console.log('点赞', res);
						that.getPostDetail() //这是更新数据的，数据库里已经改了但是不更新数据是不会改的
					} else {
						that.isNoRed = !that.isNoRed
						// that.isNoRed=false
						that.isRed = !that.isRed
						that.$u.toast(res.msg)
					}
				})
			},
			handleCommentDig(item) {
				let that = this
				that.$api('comment.dig', {
					post_comment_id: item.id
				}).then(res => {
					if (res.code === 1) {
						that.$u.toast('点赞成功')
						that.getPostDetail()
						that.params.page = 1
						that.listPostComment = []
						that.getPostComment()
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			doComment1() {
				var that = this;
				if (that.commentFlag == false) {
					return false;
				} else {
					that.commentFlag = false;
					switch (that.flagNum) {
						case 0:
							var obj = {
								post_id: that.$Route.query.post_id,
								post_comment_id: 0,
								top_post_comment_id: 0,
								content: that.message
							}
							that.doComment(obj, 0)
							break;
						case 1:
							var obj = {
								post_id: that.$Route.query.post_id,
								post_comment_id: that.replyData.id,
								top_post_comment_id: that.replyData.id,
								content: that.message
							}
							that.doComment(obj, 1)
							break;
						case 2:
							var obj = {
								post_id: that.$Route.query.post_id,
								post_comment_id: that.replyData.id,
								top_post_comment_id: that.replyData.top_post_comment_id,
								content: that.message
							}
							that.doComment(obj, 2)
							break;
					}
				}
			},
			doComment(obj, type) {
				let that = this
				if (!that.message) {
					that.$u.toast('内容不能为空');
					that.commentFlag = true;
					return false;
				}
				that.$api('comment.add', obj).then(res => {
					if (res.code === 1) {
						that.$u.toast('评论成功')
						that.showEmoji = false
						that.getPostDetail()
						that.params.page = 1;
						switch (type) {
							case 0:
								that.$refs.comment.pinglun0(res.data, that.message, that.replyData);
								break;
							case 1:
								that.$refs.comment.pinglun1(res.data, that.message, that.replyData);
								break;
							case 2:
								that.$refs.comment.pinglun2(res.data, that.message, that.replyData);
								break;
						}
						that.replyData = []
						that.message = ''
						this.replyFalg = false;
						this.replyData = []
						this.placeholder = '发表评论'
						this.flagNum = 0;
						that.commentFlag = true;
					} else {
						that.$u.toast(res.msg);
						that.commentFlag = true;
					}
				})
			},
			handleEmojiSend(item) {
				let that = this
				that.message += item
			},
			handleFeedback() {
				let that = this
				that.$api('feedback.add', {
					type: 'report',
					content: that.feedback,
					remark: `类型：${that.feedbackType}，ID：${that.post.id}`
				}).then(res => {
					if (res.code === 1) {
						that.message = ''
						that.$u.toast('举报成功')
						that.showFeedback = false
						that.feedbackType = ''
						that.feedback = ''
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.userContent {
		padding: 30rpx;
		display: flex;
		border-bottom: 1rpx solid #ECECEC;

		.userImg {
			width: 85rpx;
			height: 85rpx;
			border-radius: 50%;
			margin-right: 15rpx;
		}

		.userInfo {
			height: 85rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.userNameBox {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 100%;

				.userName {
					color: #323232;
					font-size: 28rpx;
				}

				.tags {
					font-size: 24rpx;
					color: #999;
				}
			}

			.follow {
				width: 100rpx;
				height: 42rpx;
				background: #FE4373;
				font-size: 24rpx;
				color: #fff;
				border-radius: 30rpx;
				text-align: center;
				line-height: 42rpx;
			}

			.followActive {
				width: 100rpx;
				height: 42rpx;
				background: #999;
				font-size: 24rpx;
				color: #fff;
				border-radius: 30rpx;
				text-align: center;
				line-height: 42rpx;
			}
		}

		.detailsText {
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #323232;
		}

		.topic {
			color: #FE4373;
			font-size: 26rpx;

			.topicItem {
				margin-top: 10rpx;
			}
		}

		.zanNum {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-top: 25rpx;

			.imgsItem {
				width: 38rpx;
				height: 38rpx;
				border-radius: 50%;
				border: 1rpx solid #fff;
				margin-right: -10rpx;
			}
		}

	}

	.delete {
		background: #F7F7F7;
		text-align: center;
		height: 85rpx;
		line-height: 85rpx;
		width: 100%;
		border-radius: 42rpx;
		color: #323232;
		font-size: 28rpx;
	}

	.delete2 {
		background: #fff;
		text-align: center;
		height: 85rpx;
		line-height: 85rpx;
		width: 100%;
		border-radius: 42rpx;
		color: #323232;
		font-size: 28rpx;
	}
</style>