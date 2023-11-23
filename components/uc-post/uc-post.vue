<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="flex px-4 py-2" style="border-bottom: 1rpx solid rgb(238, 238, 238,0.5);padding-top: 20rpx;"
		v-if="item.status == 'normal'">
		<image class="block rounded-full" @click="showToast" v-if="item.user == null" src="/static/avatar.png"
			style="width: 85rpx;height: 85rpx;" mode="aspectFill"></image>
		<view v-else>
			<image class="block rounded-full" :src="item.user.avatar || '/static/avatar.png'"
				@click="openUserHome(item.user_id)" mode="aspectFill" style="width: 85rpx;height: 85rpx;"></image>
		</view>
		<view class="flex-1" style="margin-left: 20rpx;padding-bottom: 20rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view class="leading-none mt-2" v-if="item.user==null">
					<text style="color: #323232;font-size: 28rpx;">无名氏</text>
					<text
						style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%;margin-left: 30rpx; line-height: 40rpx; background-color: cornsilk; color: rgb(255, 180, 31);">望</text>
					<text style="color: rgb(255, 180, 31);">0</text>
				</view>
				<view class="leading-none mt-2" @click="openUserHome(item.user_id)" v-else>
					<view style="display: flex;align-items: center;">
						<text
							style="color: #323232;font-size: 28rpx;">{{ item.role.realname + ' · ' + item.role.dynasty }}</text>
						<image :src="item.user.mw_image" style="width: 32rpx;height: 32rpx;margin-left: 12rpx;" mode="">
						</image>
						<!-- <text
							style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%;margin-left: 30rpx; line-height: 40rpx; background-color: cornsilk; color: rgb(255, 180, 31);">望</text>
						<text style="color: rgb(255, 180, 31);">{{item.user.total_mw }}</text> -->
					</view>
					<view v-if="item.role.achievements" style="font-size: 24rpx;color: #999999;margin-top: 5rpx;">
						{{item.role.achievements.replace(/,/g,"&nbsp;&nbsp;")}}
					</view>
				</view>

				<view @click=" jubao" :style="{visibility: userInfo.id != item.user_id?'visible':'hidden'}">
					<i
						class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
				</view>
			</view>

			<view class="mt-4" style="color: #323232;font-size: 32rpx;">
				<text v-if="item.is_system_build == 1" @click="">{{ item.content }} <text @click="openQuShui(item)"
						style="color:#FE4373">跟随进房 <text class="ri-arrow-right-s-line"
							style="font-size: 26rpx;margin-left: 5rpx;"></text> </text> </text>
				<text v-else @click="$u.route('/pages/post/detail', { post_id: item.id })">{{ item.content }}</text>
				<!-- 话题 -->
				<view @tap="$u.route('/pages/user/topicspeed',{post_cate_id:items.id})"
					class="text-base leading-none text-gray-500 ml-1"
					style="color: #FE4373;margin-top: 12rpx;font-size: 28rpx;" v-for="items in item.post_cate"><i
						class="ri-hashtag mr-1"></i>{{ items.title }}</view>
			</view>
			<!-- {{item}} -->
			<view v-if="item.images" class="mt-4" style="position: relative;">
				<image @click="onPreviewTap(0)" :src="item.images.split(',')[0]" mode="widthFix"
					v-if="item.images.split(',').length == 1" style="max-width: 500rpx;border-radius: 10rpx;">
				</image>
				<view v-if="item.images.split(',').length != 1" style="width: 100%;display: flex;flex-direction: row;">
					<image @click="onPreviewTap(0)" :src="item.images.split(',')[0]" mode="aspectFill"
						style="width: calc(100% / 2);height: 276rpx;margin-right: 30rpx;border-radius: 10rpx;"></image>
					<image @click="onPreviewTap(1)" :src="item.images.split(',')[1]" mode="aspectFill"
						style="width: calc(100% / 2);height: 276rpx;border-radius: 10rpx;"></image>
					<view v-if="item.images.split(',').length >2"
						style="position: absolute;right: 0;bottom: 0;color: #FFFFFF;z-index: 1;padding: 20rpx;background: rgba(0,0,0,0.5);font-size: 32rpx;">
						+1</view>
				</view>
			</view>
			<view v-if="item.audio" @click="handlePlayAudio(item.audio)"
				class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
				<view v-if="!audioStatus" style="display: flex;align-items: center;">
					<i class="ri-voiceprint-line text-2xl text-white" v-for="(item,index) in 3"></i>
				</view>
				<image v-else src="/static/bofang.gif" style="width: 100rpx;height: 35rpx;" mode="aspectFill"></image>
			</view>
			<view v-if="item.video" @click="handlePlayVideo(item.video)"
				class="mt-4 flex items-center justify-center rounded overflow-hidden w-60 bg-gray-200">
				<video class="z-0" :src="item.video" id="video" direction="0" object-fit="fill" page-gesture="true"
					controls="false"></video>
			</view>
			<view class="flex mt-4">
				<view class="flex items-center border border-solid border-gray-200 p-2 rounded-full mr-2"
					v-for="(tag, index) in item.tags" :key="index" :item="tag">
					<i class="ri-hashtag text-base leading-none text-gray-500"></i>
					<view class="text-base leading-none text-gray-500">{{ tag }}</view>
				</view>
			</view>
			<!-- <view class="flex-1 flex items-center" click="skipTopic(item)">
					{{item.post_cate.hot_num}}
				<text @tap="$u.route('/pages/user/topicspeed',{post_cate_id:item.id})"
					class="text-base leading-none text-gray-500 ml-1" style="color: #6F93BD;"
					v-for="items in item.post_cate">{{ items.title }}</text>
			</view> -->
			<view style="display: flex;flex-direction: row;align-items: center;justify-content: flex-end;width: 100%;">
				<!-- 评论 -->
				<view @click="openDetails(item)"
					style="color: #999999;display: flex;flex-direction: row;align-items: center;width: 100rpx;margin-right: 39rpx;">
					<text class="ri-chat-smile-3-line" style="font-size: 40rpx;margin-right: 10rpx;"></text>
					<text
						style="font-size: 28rpx;color: #999999;white-space: nowrap;">{{item.commentnums==0?'评论':item.commentnums}}</text>
				</view>
				<!-- 点赞 -->
				<view style="display: flex;flex-direction: row;align-items: center;width: 100rpx;"
					@click="handlePostDig()">
					<text v-show='is_zan==0' class="ri-heart-line"
						style="font-size: 40rpx;margin-right: 10rpx;color: #999999;"></text>
					<text v-show='is_zan==1' class="ri-heart-fill"
						style="font-size: 40rpx;margin-right: 10rpx;color: #fe4373;"></text>
					<text
						style="font-size: 28rpx;color: #999999;white-space: nowrap;">{{ item.diggnums ==0?'出彩':item.diggnums }}</text>
				</view>
				<!-- 无聊 -->
				<!-- <view style="color: #999999;display: flex;flex-direction: row;align-items: center;"
					@click="handleConcleDig()">
					<text v-show='is_cai==0' class="ri-emotion-normal-line"
						style="font-size: 40rpx;margin-right: 10rpx;color: #999999;"></text>
					<text v-show='is_cai==1' class="ri-emotion-normal-fill"
						style="font-size: 40rpx;margin-right: 10rpx;color: #fe4373;"></text>
					<text style="font-size: 24rpx;color: #999999;white-space: nowrap;width: 80rpx;color: #999999;"
						v-show='is_cai==0'>无聊</text>
					<text style="font-size: 24rpx;color: #999999;white-space: nowrap;width: 80rpx;color: #fe4373;"
						v-show='is_cai==1'>无聊</text>
				</view> -->
			</view>


			<!-- <view class="flex mt-4">

				<view class="flex items-center" @click="handlePostDig()">
					<i v-show='is_zan==0'
						class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<i v-show='is_zan==1'
						class="ri-heart-3-fill text-xl bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
					<text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
				</view>
				<view class="flex items-center ml-4">
					<i @click="$u.route('/pages/post/detail', { post_id: item.id })"
						class="ri-message-3-fill text-xl leading-none bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<text class="text-base leading-none text-gray-500 ml-1">{{ item.commentnums }}</text>
				</view>
			</view>
			<view style="margin-left: 450rpx; margin-top: -50rpx;" class="flex items-center" @click="handleConcleDig()">
				<image v-show='is_cai==0' src="../../static/nolove.png"
					style="width: 30rpx;margin-top: 10rpx; height: 30rpx;" mode=""></image>
				<image v-show='is_cai==1' src="../../static/nolove-red.png"
					style="width: 30rpx;margin-top: 10rpx;height: 30rpx;" mode=""></image>
			</view> -->
			<!-- <text class="text-gray-500 ml-2">{{ item.cainums }}</text> -->
		</view>
		<view class="">

			<!-- <view v-if="item.ischat" class="border border-solid border-orange-500 p-2 rounded-full text-base leading-none text-orange-500" @click="$u.route('/pages/user/home', { user_id: item.id })">私聊他</view>
			<view v-else>
                <i class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
            </view> -->
			<!-- 举报功能 -->
			<!-- <view class="" @click="showAction = true"> -->

			<u-popup :show="showAction" @close="showAction = false" :closeable="false" :round="30">
				<view class="" style="padding: 50rpx 55rpx;">
					<view class="delete" @click="shield" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">蔽该作品</view>
					</view>
					<view class="delete" @click="handleConcleDig()" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">不喜欢/点踩</view>
					</view>
					<view class="delete"
						@click="$u.route('/pages/public/report',{user_id:item.user_id,type:'动态',selectId:item.id}), showAction = false"
						style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">举报广告/色情等</view>
					</view>
					<view class="delete2" @click="showAction = false">
						<view style="font-size: 30rpx;">取消</view>
					</view>
				</view>
			</u-popup>

			<u-popup :show="showFeedback" @close="showFeedback = false" :closeable="true" :round="30"
				customStyle="min-height: 500rpx;">
				<view class="p-4">
					<view class="text-2xl text-center">举报反馈</view>
					<view class="text-gray-500 mt-6">选择分类：</view>
					<view class="flex flex-wrap rounded-full">
						<view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4"
							v-for="(item, index) in ListFeedbackType" :key="index" :item="item"
							@click="feedbackType = item" :class="feedbackType === item ? 'bg-rose-200' : ''">
							<text class="text-base">{{ item }}</text>
						</view>
					</view>
					<view class="text-gray-500 mt-6">补充说明：</view>
					<view class="flex p-4 rounded bg-gray-100 mt-4">
						<u-textarea v-model="feedback" type="text" maxlength="200" :clearable="true" :count="true"
							customStyle="border: none; background: none; padding: 0;"></u-textarea>
					</view>
					<view class="grid gap-4 mt-10 text-center">
						<view
							class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
							@click="handleFeedback()">提交</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import loginVue from '../../pages/auth/login.vue'
	export default {
		components: {},
		data() {
			return {
				audio: null,
				audioStatus: false,
				video: null,
				videoStatus: false,
				post_id: null,
				showAction: false,
				showFeedback: false,
				feedback: '',
				feedbackType: '',
				ListFeedbackType: ['色情低俗', '政治敏感', '造谣传谣', '广告欺诈', '侵犯权益', '其他'],
				post_id: "",
				is_zan: '',
				is_cai: '',
				hot: '',
				title: '',
				imgUrl: [],
				userInfo: []
			}
		},
		props: {
			item: {}
		},
		onShow() {},
		mounted() {
			this.userInfo = uni.getStorageSync("userInfo");
			this.imgUrl = this.item.images.split(",");
			this.isZan()
			this.isCai()
		},

		methods: {
			shield() {
				uni.showToast({
					icon: "none",
					title: "已屏蔽该作品"
				})
				this.showAction = false;
			},
			openQuShui(item) {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				that.$api("game.joinRoom", {
					game_room_user_id: item.user_id
				}).then(res => {
					if (res.code == 1) {
						var roomData = that.$store.state.game.gameRoomData;
						console.log(roomData.game_room_id)
						console.log(res.data.game_room_id)
						if (roomData.game_room_id == undefined) {
							this.$u.route('pages/joy/poetry?roomId=' + res.data.game_room_id)
						} else {
							if (roomData.game_room_id == res.data.game_room_id) {
								this.$u.route('pages/joy/poetry?roomId=' + res.data.game_room_id)
							} else {
								let params = {
									type: "leave_game_room",
									cate: 2,
									user_punished_code: ""
								}
								getApp().globalData.socketTask.send({
									data: JSON.stringify(params),
									success() {
										console.log("离开房间消息成功");
										that.$store.commit("setGameRoomData", [])
										that.$store.commit("setGameBarFlag", false)
										that.$nextTick(() => {
											this.$u.route('pages/joy/poetry?roomId=' + res.data
												.game_room_id)
										})
									},
									fail() {
										console.log("离开房间消息失败");
									}
								});
							}
						}

					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			openDetails(item) {
				this.$u.route('/pages/post/detail', {
					post_id: item.id
				});
				this.$emit("openDetail")
			},
			showToast() {
				uni.showToast({
					icon: "none",
					title: "用户已注销"
				})
			},
			//跳转用户详情
			openUserHome(id) {
				var that = this;
				that.$emit("openDetail");
				that.$u.route('/pages/user/home', {
					user_id: id
				})
			},
			//查看图片
			onPreviewTap(e) {
				var that = this;
				that.$emit("openDetail");
				uni.previewImage({
					current: e,
					urls: that.imgUrl
				})
			},
			skipTopic(item) {
				that.hot = uni.setStorageSync('hot', item.post_cate.hot_num)
				that.title = uni.setStorageSync('title', item.post_cate.title)
			},
			isZan() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.is_zan = res.data.is_zan
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			isCai() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.is_cai = res.data.is_cai
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			jubao() {
				let that = this
				that.$api('user.info').then(res => {
					if (res.code === 1) {
						// console.log('11',that.item.user.id,res.data.id);
						if (that.item.user.id != res.data.id) {

							that.showAction = true
						} else {
							that.$u.toast('不能举报自己哦')
						}
					} else {
						that.$u.toast(res.msg)
						return
					}
				})
			},
			// 提交举报 
			handleFeedback() {
				let that = this
				that.$api('feedback.add', {
					type: 'report',
					content: that.feedback,
					remark: that.feedbackType,
					title: "",
					images: "",
					feedback_user_id: that.item.id
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
			// 点踩
			handleConcleDig() {
				let that = this
				that.$api('user.info').then(res => {
					if (res.code === 1) {
						if (that.item.user.id != res.data.id) {
							that.$api('post.cai', {
								post_id: that.item.id,
							}).then(res => {
								if (res.code === 1) {
									that.showAction = false;
									that.$u.toast(res.msg)
								} else {
									that.showAction = false;
									that.$u.toast(res.msg)
								}
							})
						} else {
							that.$u.toast('不能给自己点踩哦')
						}

					} else {
						that.$u.toast(res.msg)
						return
					}
				})
			},
			getPostDetail() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.item.diggnums = res.data.diggnums
					}
				})
			},
			// 点踩详情
			getPostDetailCancle() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.item.cainums = res.data.cainums
					}
				})
			},
			// 点赞红心
			handlePostDig() {
				let that = this
				that.$api('post.dig', {
					post_id: that.item.id,
				}).then(res => {
					if (res.code === 1) {
						that.getPostDetail()
						that.isZan()
					} else {
						that.$u.toast(res.msg)

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
		}
	}
</script>

<style lang="scss">
	.delete {
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		opacity: 1;
		text-align: center;
		height: 85rpx;
		line-height: 85rpx;
		width: 100%;
		border-radius: 44rpx;
		color: #767676;
		font-size: 32rpx;
	}

	.delete2 {
		color: #767676;
		font-size: 32rpx;
		text-align: center;
	}
</style>