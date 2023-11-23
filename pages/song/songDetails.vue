<template>
	<view>
		<u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<i @click='topOperate' class="ri-more-2-fill " style="font-size: 38rpx;color: #333;"></i>
			</view>
		</u-navbar>
		<view class="songTop">
			<block v-if="detail.background_image==''">
				<block v-if="detail.user_background_image==''">
					<image class="songBgImg" src="@/static/userBg.png" mode="aspectFill"></image>
				</block>
				<block v-if="detail.user_background_image!=''">
					<image class="songBgImg" :src="detail.user_background_image" mode="aspectFill"></image>
				</block>
			</block>
			<block v-if="detail.background_image!=''">
				<image class="songBgImg" :src="detail.background_image" mode="aspectFill"></image>
			</block>
			<view class="userContainer">
				<view class="userImg">
					<image class="img" @click="userImgClick" :class="animationFlag?'imgRotate':''" :src="detail.avatar"
						mode="aspectFill">
					</image>
				</view>
				<view class="centerUser">
					<view style="font-size: 32rpx;color: #3D3D3D;margin-top: 10rpx;display: flex;align-items: center;"
						@click="$u.route('/pages/user/home', {user_id: detail.user_id})">
						<text>{{detail.role_realname}}·{{detail.role_dynasty}}</text>
						<image :src="detail.mw_image" style="width: 32rpx;height: 32rpx;margin-left: 12rpx;" mode="">
						</image>
					</view>
					<view style="font-size: 28rpx;color: #3D3D3D;margin-top: 20rpx;">{{detail.song_title||'暂无主题'}}
					</view>
					<view class="topFooter">
						<view style="display: flex;align-items: center;">
							<view style="color: #808080;display: flex;align-items: center;">
								<text class="ri-mic-fill" style="font-size: 35rpx;"></text>
								<view style="font-size: 23rpx;margin-left: 10rpx;width: 50rpx;white-space: nowrap;">
									{{detail.reply_nums}}
								</view>
							</view>
							<view style="display: flex;align-items: center;" @click="zan">
								<block v-if="detail.is_zan==0">
									<text class="ri-heart-line" style="color: #808080;font-size: 35rpx;"></text>
								</block>
								<block v-else>
									<text class="ri-heart-fill" style="color: #FE4373;font-size: 35rpx;"></text>
								</block>
								<view
									style="font-size: 23rpx;margin-left: 10rpx;color: #808080;width: 50rpx;white-space: nowrap;">
									{{detail.zan_nums}}
								</view>
							</view>
							<block v-if="userInfo.id != detail.user_id">
								<image @click="showGift" src="@/static/cailiwu.png"
									style="width: 36rpx;height: 36rpx;margin-left: 15rpx;" mode="">
								</image>
							</block>
						</view>
						<view class="connect" @click="connect">
							<text class="ri-mic-fill" style="font-size: 30rpx;margin-right: 5rpx;"></text>
							<text style="margin-left: 5rpx;">接一句</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 50rpx;" v-if="!replyList.length">
			<u-empty icon="/static/wupinglun.png" text="暂无歌曲内容" textColor="#a1a1a1" marginTop="0"></u-empty>
		</view>
		<view class="audioLists" v-else>
			<view class="audioItem" v-for="(item,index) in replyList" :key="index">
				<view class="userItemImg">
					<image class="userItemImage" @click="openMine(item)" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view style="flex: 1;">
					<view style="display: flex;align-items: center;">
						<text @click="openMine(item)"
							style="font-size: 28rpx;color: #323232;">{{item.role_realname}}·{{item.role_dynasty}}</text>
						<image :src="item.mw_image" style="width: 32rpx;height: 32rpx;margin-left: 12rpx;" mode="">
						</image>
					</view>
					<view style="margin-top: 15rpx;display: flex;align-items: center;justify-content: space-between;">
						<view class="audioBlock" @click="replyItem(item,index)" @longpress="replyOperate(item)"
							:style="{background:replyData.id == item.id?'#FE4373':'#FF6D93'}">
							<view style="display: flex;align-items: center;">
								<block v-if="item.replyIndex == null">
									<text class="ri-voiceprint-line" style="color: #fff;font-size: 40rpx;"
										v-for="(item,index) in 2" :key="index">
									</text>
								</block>
								<block v-else-if="item.replyIndex == index && isPause==false">
									<image src="@/static/bofang.gif" style="width: 80rpx;height: 35rpx;"
										mode="heightFix"></image>
								</block>
								<block v-if="isPause==true && item.pauseIndex == index">
									<text class="ri-play-fill" style="color: #fff;font-size: 40rpx;">
									</text>
								</block>
							</view>
							<text style="color: #fff;font-size: 25rpx;">{{item.duration_time}}''</text>
						</view>
						<view @click="replyZan(item,index)">
							<block v-if="item.is_zan==0">
								<text class="ri-heart-line"
									style="color: #808080;font-size: 35rpx;margin-right: 15rpx"></text>
							</block>
							<block v-else>
								<text class="ri-heart-fill"
									style="color: #FE4373;font-size: 35rpx;margin-right: 15rpx"></text>
							</block>
							<text style="font-size: 28rpx;color: #808080;">{{item.zan_nums}}</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: 28rpx;">
						<text
							style="font-size: 25rpx;color: #3D3D3D;opacity: 0.6rpx;margin-right: 30rpx;opacity: 0.6;">{{item.createtime}}</text>
						<text style="font-size: 25rpx;color: #FE4373;opacity: 0.6rpx;margin-right: 30rpx;"
							@click="replyConnect(item)">接一句</text>
						<block v-if="userInfo.id != item.user_id">
							<image @click="showGift2(item)" src="@/static/cailiwu.png"
								style="width: 36rpx;height: 36rpx;margin-left: 15rpx;" mode="">
							</image>
						</block>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="connectFlag" :closeable="false" :round="30">
			<view class="recorder">
				<view
					style="text-align: right;padding-top: 30rpx;padding-right: 30rpx;font-size: 39rpx;box-sizing: border-box;"
					@click="closeRecorder">
					<text class="ri-close-fill"></text>
				</view>
				<feiRecorder @cancellation="cancellation" @recorderStart="recorderStart" ref="feiRecorder"
					@getAudioUrl="getAudioUrl"></feiRecorder>
				<view :style="{visibility:recorderStartFlag?'':'hidden'}"
					style="text-align: center;font-size: 25rpx;margin: 50rpx 0rpx;">
					点击开始录音
				</view>
				<!-- <view class="delete22" @click="close" style="">
					<view style="font-size: 30rpx;">取消</view>
				</view> -->
			</view>
		</u-popup>
		<feiGift ref="feiGift" channel="4"></feiGift>
		<feiOperate @close="closePopup" @delete="del" ref="feiOperate" @tread="tread" @report="report"
			:showDelete="showDelete" :showReport="showReport" :showCai="showCai" :showShield="showShield"
			@shield="shield">
		</feiOperate>
	</view>
</template>

<script>
	import feiGift from "@/components/fei-gift/fei-gift.vue"
	import feiRecorder from "@/components/fei-recorder/fei-recorder.vue"
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	export default {
		components: {
			feiRecorder,
			feiGift,
			feiOperate
		},
		data() {
			return {
				platform: uni.getSystemInfoSync().platform,
				detail: [],
				replyList: [],
				page: 1,
				connectFlag: false,
				audio: null,
				animationFlag: false,
				palyData: [],
				isPause: false,
				topPid: null,
				userInfo: uni.getStorageSync("userInfo"),
				showDelete: false,
				showReport: false,
				operateType: null,
				replyData: [],
				recorderStartFlag: true,
				userClickFlag: false,
				topAudioFlag: false,
				showCai: false,
				showShield: false,
			}
		},
		onLoad() {
			this.getDetail();
			this.getReplyList()
		},
		onUnload() {
			if (this.audio != null) {
				this.audio.stop()
				this.audio.destroy();
				this.audio = null;
				this.animationFlag = false;
			}
		},
		onHide() {
			if (this.audio != null) {
				this.audio.stop()
				this.audio.destroy()
				this.audio = null;
				this.animationFlag = false;
			}
		},
		onReachBottom() {
			this.page++;
			this.getReplyList()
		},
		methods: {
			shield() {
				uni.showToast({
					icon: "none",
					title: "已屏蔽该作品"
				})
				let timeOut = setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
					clearTimeout(timeOut)
				}, 500)
			},
			openMine(item) {
				var that = this;
				that.$u.route('/pages/user/home', {
					user_id: item.user_id
				})
			},
			userImgClick() {
				if (this.topAudioFlag == false) {
					this.userClickFlag = !this.userClickFlag;
					this.replyItem(this.detail, -1)
				}
			},
			cancellation() {
				this.recorderStartFlag = true;
			},
			recorderStart() {
				this.recorderStartFlag = false;
			},
			closeRecorder() {
				this.connectFlag = false;
				this.$refs.feiRecorder.stopRecorder()
			},
			del() {
				if (this.operateType == 'reply') {
					this.delModule(2, this.replyData.id)
				} else {
					this.delModule(1, this.$Route.query.songId)
				}
			},
			delModule(cate, id) {
				let that = this;
				that.$api("song.del", {
					type: cate,
					id: id
				}).then(res => {
					if (res.code == 1) {
						if (cate == 1) {
							uni.$emit('songUpdate', {
								msg: '页面更新'
							})
							that.$u.route({
								type: 'navigateBack',
								delta: 1
							})
						} else if (cate == 2) {
							if (that.audio != null) {
								that.audio.stop()
								that.animationFlag = false;
							}
							that.replyList.forEach((val, index) => {
								if (val.id == that.replyData.id) {
									that.replyList.splice(index, 1);
									that.$forceUpdate()
								}
							})
							that.operateType = null;
							that.replyData = []
						}
					}
				})
			},
			closePopup() {
				this.operateType = null;
				this.replyData = []
			},
			replyOperate(item) {
				if (this.userInfo.id == item.user_id) {
					this.showDelete = true;
					this.showReport = false;
					this.showCai = false;
				} else {
					this.showDelete = false;
					this.showReport = true;
					this.showCai = true;
				}
				this.replyList.forEach((val, index) => {
					val.replyIndex = null;
					val.pauseIndex = null;
				})
				this.palyData = [];
				this.replyData = item;
				this.operateType = "reply";
				this.$refs.feiOperate.show();
			},
			tread() {
				var that = this;
				if (this.operateType == 'reply') {
					that.$api("song.reply_zan_or_cai", {
						id: that.replyData.id,
						code: 2
					}).then(res => {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					})
					this.replyData = []
					this.operateType = null
				} else {
					this.zan_or_cai(2)
				}
			},
			report() {
				var that = this;
				if (this.operateType == 'reply') {
					that.$u.route('/pages/public/report', {
						user_id: that.replyData.user_id,
						type: '对歌回复',
						selectId: that.replyData.id
					})
					this.replyData = []
					this.operateType = null
				} else {
					that.$u.route('/pages/public/report', {
						user_id: that.detail.user_id,
						type: '对歌',
						selectId: that.$Route.query.songId
					})
				}
			},
			topOperate() {
				if (this.userInfo.id == this.detail.user_id) {
					this.showDelete = true;
					this.showReport = false;
					this.showCai = false;
					this.showShield = false;
				} else {
					this.showDelete = false;
					this.showReport = true;
					this.showCai = true;
					this.showShield = true;
				}
				this.$refs.feiOperate.show();
			},
			replyZan(item, index) {
				let that = this;
				that.$api("song.reply_zan_or_cai", {
					id: item.id,
					code: 1
				}).then(res => {
					if (res.code == 1) {
						that.replyList[index].is_zan = that.replyList[index].is_zan == 0 ? 1 : 0;
						that.replyList[index].zan_nums = that.replyList[index].is_zan == 0 ? --that.replyList[
							index].zan_nums : ++that.replyList[index].zan_nums;
					}
				})
			},
			showGift2(item) {
				this.$refs.feiGift.show();
				this.$refs.feiGift.setThird_id(this.$Route.query.songId);
				this.$refs.feiGift.setId(item.user_id);
			},
			showGift() {
				this.$refs.feiGift.show();
				this.$refs.feiGift.setThird_id(this.$Route.query.songId);
				this.$refs.feiGift.setId(this.detail.user_id);
			},
			replyConnect(item) {
				if (this.audio != null) {
					this.audio.stop()
					this.animationFlag = false;
				}
				this.isPause = false;
				this.connectFlag = !this.connectFlag;
				this.topPid = item.id;
			},
			replyItem(item, index) {
				let that = this;
				if (index == -1) {
					if (this.userClickFlag) {
						that.animationFlag = false;
						that.audio.pause();
					} else {
						that.animationFlag = true;
						that.audio.play();
					}
					return;
				} else {
					that.topAudioFlag = true;
					that.animationFlag = false;
				}
				// -------------------------

				if (that.palyData.length == 0) {
					that.palyData = item;
					if (this.audio != null) {
						this.audio.stop()
					}
					that.animationFlag = false;
					that.replyList[index].replyIndex = index;
					that.playAudio(item.voice, "2");
					that.$forceUpdate()
				} else {
					if (item.id == that.palyData.id) {
						if (that.isPause == false) {
							that.audio.pause();
							that.isPause = true;
							that.replyList[index].pauseIndex = index;
						} else {
							that.audio.play();
							that.isPause = false;
							that.replyList[index].pauseIndex = null;
						}
					} else {
						that.palyData = item;
						that.isPause = false;
						if (this.audio != null) {
							this.audio.stop()
						}
						that.animationFlag = false;
						that.replyList.forEach((val, index) => {
							val.replyIndex = null;
							val.pauseIndex = null;
						})
						that.replyList[index].replyIndex = index;
						that.playAudio(item.voice, "2");
						that.$forceUpdate()
					}
				}
			},
			close() {
				this.connectFlag = false;
			},
			getAudioUrl(e) {
				let that = this;
				that.$api("song.reply", {
					duet_song_id: that.$Route.query.songId,
					pid: that.topPid,
					voice: e.url,
					duration_time: e.timer
				}).then(res => {
					that.connectFlag = false;
					if (res.code == 1) {
						that.replyList = [];
						that.page = 1;
						that.getReplyList()
					}

					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			connect() {
				if (this.audio != null) {
					this.audio.stop()
					this.animationFlag = false;
				}
				this.replyList.forEach((val, index) => {
					val.replyIndex = null;
					val.pauseIndex = null;
				})
				this.palyData = [];
				this.isPause = false;
				this.connectFlag = !this.connectFlag;
				this.topPid = 0;
			},
			zan() {
				this.zan_or_cai(1)
			},
			zan_or_cai(code) {
				let that = this;
				that.$api("song.zan_or_cai", {
					duet_song_id: that.$Route.query.songId,
					code: code
				}).then(res => {
					if (res.code == 1) {
						if (code == 1) {
							that.detail.is_zan = that.detail.is_zan == 0 ? 1 : 0;
							that.detail.zan_nums = that.detail.is_zan == 0 ? --that.detail.zan_nums : ++that.detail
								.zan_nums;
						}
					}
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			getReplyList() {
				let that = this;
				that.$api("song.reply_list", {
					page: that.page,
					limit: 10,
					duet_song_id: that.$Route.query.songId
				}).then(res => {
					if (res.code == 1) {
						that.replyList = [...that.replyList, ...res.data];
						that.topPid = null;
						that.type = null;
						that.replyList.forEach((val, index) => {
							val.replyIndex = null;
							val.pauseIndex = null;
						})
					}
				})
			},
			getDetail() {
				let that = this;
				that.$api("song.details", {
					duet_song_id: that.$Route.query.songId
				}).then(res => {
					if (res.code == 1) {
						that.detail = res.data;
						that.playAudio(res.data.voice, "1");
						that.animationFlag = true;
					}
				})
			},
			//播放音频
			playAudio(url, cate) {
				var that = this;
				if (that.audio == null) {
					that.audio = uni.createInnerAudioContext();
				}
				that.audio.src = url;
				that.$nextTick(function() {
					that.audio.play();
					that.isPlay = true;
					that.operateNum = 2;
					that.audio.onEnded((e) => {
						if (url == that.detail.voice) {
							that.topAudioFlag = true;
						}
						if (cate == "1") {
							that.animationFlag = false;
						} else if (cate == "2") {
							that.palyData = [];
							that.isPause = false;
							that.replyList.forEach((val, index) => {
								val.replyIndex = null;
								val.pauseIndex = null;
							})
							that.$forceUpdate()
						}
					})
					that.audio.onPause((e) => {

					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.delete22 {
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		opacity: 1;
		text-align: center;
		height: 85rpx;
		line-height: 85rpx;
		border-radius: 44rpx;
		color: #767676;
		font-size: 32rpx;
		margin: 50rpx 30rpx 50rpx 30rpx;
	}

	.recorder {
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		padding-bottom: 50rpx;
	}

	.audioBlock {
		width: 275rpx;
		height: 65rpx;
		background: #FF6D93;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		text-align: center;
		display: flex;
		align-items: center;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.audioItem {
		padding: 30rpx 0rpx;
		box-sizing: border-box;
		display: flex;
	}

	.userItemImg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 20rpx;
		margin-top: 20rpx;

		.userItemImage {
			width: 100%;
			height: 100%;
		}
	}

	.audioLists {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
	}

	.connect {
		width: 185rpx;
		height: 65rpx;
		text-align: center;
		font-size: 28rpx;
		line-height: 65rpx;
		color: #fff;
		background: #FE4373;
		border-radius: 10rpx;
	}

	.centerUser {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: linear-gradient(180deg, rgba(185, 177, 177, 0) 0%, #FFFFFF 100%);
	}

	.topFooter {
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 20rpx;
		margin-top: 20rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.songTop {
		height: 528rpx;
		position: relative;

		.songBgImg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.userContainer {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: flex-end;
			box-sizing: border-box;

			.userImg {
				width: 205rpx;
				height: 205rpx;
				background: rgba(255, 255, 255, 0.6);
				border: 1rpx solid rgba(0, 0, 0, 0.2);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.img {
		width: 140rpx;
		height: 140rpx;
		// box-shadow: inset 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		border-radius: 50%;
		opacity: 1;
	}

	.imgRotate {
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-delay: 0;
		animation-duration: 3s;
		animation-name: rotate;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>