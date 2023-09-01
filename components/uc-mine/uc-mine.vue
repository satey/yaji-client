<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<u-popup :show="showAction" @close="showAction = false" :closeable="true" :round="30">
		<view class="p-3">
			<!-- <view class="text-2xl text-center">操作</view> -->
			<view class="">
				<view class="delete" @click="showFeedback = true, showAction = false" style="margin-top: 50rpx;">
					<!-- <i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i> -->
					<view style="font-size: 30rpx;" @click="detail">删除</view>
				</view>
				<view class="delete2" @click="showFeedback = true, showAction = false" style="margin-top: 20rpx;">
					<!-- <i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i> -->
					<view style="font-size: 30rpx;">取消</view>
				</view>
			</view>
		</view>
	</u-popup>
	<view class="item" v-if="item.status == 'normal'">
		<view style="display: flex;align-items: center;justify-content: space-between;">
			<text class="date">
				<text>{{$u.date(item.createtime, 'yy-')}}</text>
				<text>{{$u.date(item.createtime, 'mm月')}}</text>
				<text style="margin-right: 5px;">{{$u.date(item.createtime, 'd')}}</text>
				<text>{{$u.date(item.createtime, 'hh:MM')}}</text>
			</text>
			<text @click="showAction = true" class="ri-more-fill" style="font-size: 30rpx;color: #999;"></text>
		</view>
		<view class="itemCntent">
			<view>
				<text class="contentText"
					@click="$u.route('/pages/post/detail', { post_id: item.id })">{{ item.content }}
				</text>
			</view>
			<!-- image -->
			<view class="img" v-if="item.images">
				<view v-if="images.length<=1">
					<image mode="widthFix" @click="onPreviewTap(0)"
						style="max-width: 500rpx;margin-top:25rpx;border-radius: 12rpx;" :src="images[0]">
					</image>
				</view>

				<view class="imgs" v-if="images.length>1">
					<image class="imgItem" @click="onPreviewTap(0)" mode="aspectFill" :src="images[0]">
					</image>
					<image class="imgItem" @click="onPreviewTap(1)" mode="aspectFill" :src="images[1]">
					</image>
					<view v-if="images.length>=3"
						style="position: absolute;right: 0;bottom: 0;color: #FFFFFF;z-index: 1;padding: 20rpx;background: rgba(0,0,0,0.5);font-size: 32rpx;">
						{{images.length>=3?'+1':""}}
					</view>
				</view>
			</view>
			<!-- audio -->
			<view v-if="item.audio" @click="handlePlayAudio(item.audio)"
				class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
				<i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
			</view>
			<!-- video -->
			<view v-if="item.video" @click="handlePlayVideo(item.video)"
				class="mt-4 flex items-center justify-center rounded overflow-hidden w-60 bg-gray-200">
				<video class="z-0" :src="item.video" id="video" direction="0" object-fit="fill" page-gesture="true"
					controls="false"></video>
			</view>
		</view>
		<!-- 底部 -->
		<view
			style="display: flex;flex-direction: row;align-items: center;justify-content: flex-end;margin-top: 15rpx;">
			<!-- 评论 -->
			<!-- <view @click="$u.route('/pages/post/detail', { post_id: item.id })"
				style="color: #999999;display: flex;flex-direction: row;align-items: center;flex: 1;justify-content: flex-end;">
				<text class="ri-chat-smile-3-line" style="font-size: 40rpx;margin-right: 10rpx;"></text>
				<text style="font-size: 24rpx;">{{item.commentnums==0?'评论':item.commentnums}}</text>
			</view> -->

			<view style="display: flex;align-items: center;margin-right: 30rpx;" v-if="item.cainums!=0">
				<text class="ri-emotion-normal-line"
					style="font-size: 40rpx;margin-right: 10rpx;color: #999999;"></text>
				<view style="font-size: 24rpx;color: #999999;width: 20rpx;white-space: nowrap;width: 50rpx;">
					{{ item.cainums ==0?'无聊':item.cainums }}
				</view>
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
				is_cai: '',
				images: []
			}
		},
		props: {
			item: {}
		},
		computed: {},
		mounted() {
			let that = this;
			if (this.item.images != null) {
				that.images = this.item.images.split(",");
			}
			// this.isZan()
			// this.isCai()
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
						var Time = setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/mine'
							});
							clearTimeout(Time)
						}, 500)
					}
				})
			},
			// 是否点赞
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
			// 是否点踩
			isCai() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.is_cai = res.data.is_cai
						that.isCai()
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
									that.is_cai = 1
									that.getPostDetailCancle()
									that.isCai()
								} else {
									that.is_cai = 0
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
						console.log('点赞');
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

		.itemCntent {
			margin-top: 20rpx;

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

				.imgItem {
					height: 335rpx;
					width: calc(100% / 2 - 10rpx);
					border-radius: 12rpx;
				}
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