<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view style="margin-top: 50rpx;" v-if="item.status !='hidden'">
		<view class="">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text class="date">
					<text>{{$u.date(item.createtime, 'yy-')}}</text>
					<text>{{$u.date(item.createtime, 'mm月')}}</text>
					<text style="margin-right: 5px;">{{$u.date(item.createtime, 'd')}}</text>
					<text>{{$u.date(item.createtime, 'hh:MM')}}</text>
				</text>
			</view>
		</view>
		<view class="itemCntent">
			<view class="contentText" @click="$u.route('/pages/post/detail', { post_id: item.id })">
				<text>{{ item.content }}</text>
			</view>
			<view class="img" v-if="item.images">
				<view v-if="images.length<=1">
					<image mode="heightFix" @click="onPreviewTap(0)"
						style="max-width: 500rpx;margin-top:25rpx;border-radius: 12rpx;" :src="images[0]">
					</image>
				</view>

				<view class="imgs" v-if="images.length>1">
					<image class="imgItem" @click="onPreviewTap(0)" mode="aspectFill" :src="images[0]">
					</image>
					<image class="imgItem" @click="onPreviewTap(1)" mode="aspectFill" :src="images[1]">
					</image>
					<view v-if="images.length>2"
						style="position: absolute;right: 0;bottom: 0;color: #FFFFFF;z-index: 1;padding: 20rpx;background: rgba(0,0,0,0.5);font-size: 32rpx;">
						+1</view>
				</view>
				<view v-if="item.audio" @click="handlePlayAudio(item.audio)"
					class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
					<i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
				</view>
			</view>
			<view
				style="display: flex;flex-direction: row;align-items: center;justify-content: flex-end;margin-top: 15rpx;">
				<!-- 评论 -->
				<view @click="$u.route('/pages/post/detail', { post_id: item.id })"
					style="color: #999999;display: flex;flex-direction: row;align-items: center;flex: 1;justify-content: flex-end;">
					<text class="ri-chat-smile-3-line" style="font-size: 40rpx;margin-right: 10rpx;"></text>
					<text style="font-size: 24rpx;width: 100rpx;">{{item.commentnums==0?'评论':item.commentnums}}</text>
				</view>
				<!-- 点赞 -->
				<view @click="handlePostDig()" style="display: flex;align-items: center;">
					<text v-show='is_zan==0' class="ri-heart-line"
						style="font-size: 40rpx;margin-right: 10rpx;color: #999999;"></text>
					<text v-show='is_zan==1' class="ri-heart-fill"
						style="font-size: 40rpx;margin-right: 10rpx;color: #fe4373;"></text>
					<view style="font-size: 24rpx;color: #999999;width: 20rpx;white-space: nowrap;width: 50rpx;">
						{{ item.diggnums ==0?'出彩':item.diggnums }}
					</view>
				</view>
				<!-- 无聊 -->
				<!-- <view
					style="color: #999999;display: flex;flex-direction: row;align-items: center;flex: 1;justify-content: flex-end;"
					@click="handleConcleDig()">
					<text v-show='is_cai==0' class="ri-emotion-normal-line"
						style="font-size: 40rpx;margin-right: 10rpx;color: #999999;"></text>
					<text v-show='is_cai==1' class="ri-emotion-normal-fill"
						style="font-size: 40rpx;margin-right: 10rpx;color: #fe4373;"></text>
					<text style="font-size: 24rpx;">{{item.cainums ==null?'无聊':item.cainums}}</text>
				</view> -->
			</view>
		</view>
		<view class="flex-1" style="display: none;">
			<!-- 删除 -->
			<!-- 	<view class="" style="float: right; margin-top: -30rpx;"  @click="showAction = true">
			    <i class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
			</view> -->

			<u-popup :show="showAction" @close="showAction = false" :closeable="true" :round="0">
				<view class="p-3">
					<!-- <view class="text-2xl text-center">操作</view> -->
					<view class="grid grid-cols-5 gap-4 mt-6">
						<view class="text-center" @click="showFeedback = true, showAction = false">
							<view class="text-base mt-2" style="font-size: 30rpx;" @click="detail">删除</view>
						</view>
					</view>
				</view>
			</u-popup>


			<!-- 
			<view v-if="item.images" class="mt-4">
				<u-album :urls="item.images.split(',')" multipleSize="150" rowCount="3"></u-album>
			</view> -->

			<view v-if="item.audio" @click="handlePlayAudio(item.audio)"
				class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
				<i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
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

			<view class="flex mt-4" style="display: none;">
				<!--  <view class="flex-1 flex items-center">
                    <i class="ri-eye-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-gray-500 ml-2">{{ item.viewnums }}</text>
                </view> -->
				<view class="flex items-center" @click="handlePostDig()">
					<!-- <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i> -->
					<i v-show='is_zan==0'
						class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<i v-show='is_zan==1'
						class="ri-heart-3-fill text-xl bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
					<text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
				</view>
				<view class="flex items-center ml-4">
					<i @click="$u.route('/pages/post/detail', { post_id: item.id })"
						class="ri-message-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<text class="text-gray-500 ml-2">{{ item.commentnums }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				audio: null,
				audioStatus: false,
				video: null,
				videoStatus: false,
				isRed: false,
				isNoRed: true,
				post_id: null,
				showAction: false,
				showFeedback: false,
				post_id: "",
				is_zan: '',
				// --------
				images: []
			}
		},
		props: {
			item: {}
		},
		computed: {},
		onLoad(option) {
			let that = this
		},
		mounted() {
			this.isZan()
			let that = this;
			if (this.item.images != null) {
				that.images = this.item.images.split(",");
			}
		},
		methods: {
			//查看图片
			onPreviewTap(e) {
				var that = this;
				uni.previewImage({
					current: e,
					urls: that.images
				})
			},
			async getPostMine() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.mine', that.params).then(res => {
					if (res.code === 1) {
						that.listPostMine = res.data.data
						that.listPostMine.forEach(item => {
							item.user = that.userInfo
						})
					}
				})
			},
			// 删除//
			detail() {
				let that = this
				// console.log('删除');
				that.$api('post.del', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						console.log('删除成功');

						that.getPostMine()
						setTimeout(() => {
							this.$router.go(0)
						}, 500)
					}
				})
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
			// 点赞红心
			handlePostDig() {
				let that = this
				that.$api('post.dig', {
					post_id: that.item.id,
				}).then(res => {
					if (res.code === 1) {
						that.isRed = !that.isRed
						that.isNoRed = !that.isRed
						that.getPostDetail()
						that.isZan()

					} else {
						that.isNoRed = !that.isNoRed
						that.isRed = !that.isRed
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
	.date {
		font-size: 24rpx;
		color: #999999;
	}

	.item {
		padding: 30rpx 40rpx;
		box-sizing: border-box;
	}

	.itemCntent {
		margin-top: 20rpx;
	}

	.contentText {
		font-size: 26rpx;
		color: #323232;
	}

	.imgs {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 25rpx;
		position: relative;


	}

	.imgItem {
		height: 335rpx;
		width: calc(100% / 2 - 10rpx);
		border-radius: 12rpx;
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