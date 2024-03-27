<template>
	<view>
		<feiauthority ref="authority" @audioEmpower="audioEmpower"></feiauthority>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 404rpx;" src="@/static/yinshiBg.png"
			mode="">
		</image>
		<view class="seach">
			<u-navbar :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
		</view>
		<view style="height: 404rpx;"></view>
		<view
			style="padding: 0rpx 35rpx;box-sizing: border-box;display: flex;align-items: center;justify-content: space-between;">
			<view style="display: flex;align-items: center;">
				<view class="line"></view>
				<view style="color:#333333 ;font-size: 32rpx;margin-left: 6rpx;">选择诗作</view>
			</view>
			<view @click="$u.route('pages/poetry/poetryWorks')" class="yinshiBtn">查看作品</view>
		</view>
		<view style="padding: 0rpx 35rpx;box-sizing: border-box;margin-top: 25rpx;">
			<scroll-view scroll-x="true">
				<view style="display: flex;align-items: center;">
					<view v-for="(item,index) in category_list" :key="index" @click="clickTabItem(item,index)"
						style="display: flex;flex-direction: column;justify-content: center;margin-right: 40rpx;align-items: center;font-size: 30rpx;">
						<view :style="{color:tabindex==index?'#FFA000':'#333'}" style="white-space: nowrap;">
							{{item.value}}</view>
						<view :style="{opacity:tabindex==index?'1':'0'}" class="line2"></view>
					</view>
				</view>
			</scroll-view>
			<!-- <view style="display: flex;align-items: center;">
				<view v-for="(item,index) in category_list" :key="index" @click="clickTabItem(item,index)"
					style="display: flex;flex-direction: column;justify-content: center;margin-right: 40rpx;align-items: center;font-size: 30rpx;">
					<view :style="{color:tabindex==index?'#FFA000':'#333'}" style="white-space: nowrap;">{{item.value}}</view>
					<view :style="{opacity:tabindex==index?'1':'0'}" class="line2"></view>
				</view>
			</view> -->

			<view>
				<view class="listItem" v-for="(item,index) in list" :key="index">
					<view style="width: 80%;">
						<view style="display: flex;align-items: center;">
							<view style="color: #333333;font-size: 30rpx;margin-right: 10rpx;">
								<block v-if="item.title.length >=11">
									{{item.title.slice(0,11)}}...
								</block>
								<block v-else>
									{{item.title}}
								</block>
							</view>
							<view style="color: #666666;font-size: 26rpx;">
								<block v-if="item.name_str.length >=6">
									{{item.name_str.slice(0,6)}}...
								</block>
								<block v-else>
									{{item.name_str}}
								</block>
							</view>
						</view>
						<view
							style="color: #666666;font-size: 26rpx;margin-top: 21rpx;width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
							{{item.content}}
						</view>
					</view>
					<view @click="clickItem(item)"
						style="width:112rpx ;height:59rpx ;background:#FFA000 ;color: #fff;font-size: 28rpx;border-radius: 6rpx;line-height: 59rpx;text-align: center;">
						选择</view>
				</view>
				<u-empty v-if="!list.length" icon="/static/iconImage/jilu.png" text="暂无数据" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</view>
		</view>
		<u-popup :show="releaseShow" @close="closeReleaseShow " mode="center" :overlayOpacity="0.5" :closeable="false"
			:round="20" :customStyle="{background:'transparent'}">
			<view class="release">
				<view style="color:#333333 ;font-size: 36rpx;text-align: center;">
					{{selectData.title}}
				</view>
				<view style="margin-top: 25rpx;color:#666 ;font-size: 32rpx;text-align: center;">
					{{selectData.author}}
				</view>
				<view style="margin-top: 30rpx;color:#333 ;font-size: 32rpx;text-align: center;min-height: 25%;">
					<text>{{selectData.content}}</text>
				</view>
				<view :style="{opacity:recorderUrl==''?'1':'0'}">
					<view :style="{opacity:recordLength==0?'0':'1'}" style="text-align: center;">
						{{recordLength}}s
					</view>
				</view>
				<!-- 语音 -->
				<view>
					<view style="margin-top: 5rpx;height: 195rpx;" v-if="recorderUrl == ''">
						<view class="flex justify-center items-center" @touchstart="handleRecordStart"
							@touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop">
							<view class="relative flex justify-center items-center rounded-full">
								<view class="flex justify-center items-center rounded-full z-10"
									style="background: #FFA000 !important;width: 140rpx;height: 140rpx;">
									<i class="ri-mic-fill text-4xl leading-none text-white"></i>
								</view>
								<view v-if="recording"
									class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
									style="background: #FFA000 !important;">
									<view class="rounded-full w-20 h-20 p-2 opacity-50">
									</view>
								</view>
							</view>
						</view>
						<view style="text-align: center;margin-top: 25rpx;color:#000000 ;font-size: 28rpx;">
							{{recordTip}}
						</view>
					</view>
					<view v-else style="display: flex;justify-content: center;height: 195rpx;">
						<view class="mt-4" style="display: flex;align-items: center;">
							<view @click="openRecord"
								style="width: 328rpx;background: #FFA000;justify-content: space-around;padding: 0rpx 10rpx;"
								class="flex items-center  rounded-full w-32 h-10 bg-gradient-to-r  to-rose-400">
								<i class="iconfont" :class="isPlay==false?'icon-bofang1':'icon-bofang'"
									style="font-size: 50rpx;color: #FFFFFF;"></i>
								<block>
									<view v-if="isPlay==false"
										style="display: flex;align-items: center;justify-content: center;flex: 1;">
										<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
											v-for="(item,index) in 4" :key="index">
										</view>
									</view>
									<view v-if="isPlay"
										style="display: flex;align-items: center;justify-content: center;flex: 1;">
										<image src="../../static/bofang.gif" style="width:90rpx;height: 25rpx;">
										</image>
									</view>
								</block>
								<!-- <image src="/static/bofang.gif" style="width: 80rpx;height: 45rpx;" v-else mode="heightFix"></image> -->
								<!-- <i class="ri-voiceprint-line text-2xl text-white" style="flex: 1;" :class="audioStatus ? 'animate-pulse' : ''"></i> -->
								<text style="color: #FFFFFF;font-size: 28rpx;margin-left: 20rpx;"
									v-if="recordLength !=0">{{recordLength}}s</text>
							</view>
							<view class="ri-close-line" @click="clearAudio"
								style="padding: 0rpx;background: rgba(0,0,0,0.5);margin-left: 30rpx;color: #fff;font-size: 40rpx;border-radius: 50%;box-sizing: border-box;">
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 33rpx;">
						<view class="fasong" @click="fasong">
							<image src="@/static/fasong.png" style="width: 115rpx;height: 40rpx;" mode=""></image>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 50rpx;"
						@click="original =!original">
						<image v-if="original" src="@/static/iconImage/radio.png"
							style="width: 30rpx;height: 30rpx;margin-right: 6rpx;" mode=""></image>
						<image v-else src="@/static/iconImage/radio2.png"
							style="width: 30rpx;height: 30rpx;margin-right: 6rpx;" mode=""></image>
						<text style="color:#333333 ;font-size: 28rpx;">同时发布到动态</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabindex: 0,
				page: 1,
				category_list: [],
				category_id: '',
				list: [],
				releaseShow: false,
				selectData: [],
				recorder: uni.getRecorderManager(),
				audio: uni.createInnerAudioContext(),
				recordTip: "按住录音",
				recording: false,
				recordTimer: null,
				recordLength: 0,
				recorderUrl: '',
				isPlay: false,
				original: true,
				audioStatus: false,
				ispause: false
			}
		},
		onLoad() {
			var that = this;
			this.init()
			this.watchRecorder()
			// #ifdef APP
			this.$nextTick(() => {
				that.$refs.authority.show('recorde')
			})
			// #endif
		},
		onReachBottom() {
			this.page++;
			this.init()
		},
		methods: {
			fasong() {
				this.$api('activity.addRecitePoetry', {
					audio: this.recorderUrl,
					duration_time: this.recordLength,
					is_post: this.original ? 1 : 0,
					poetry_id: this.selectData.poetry_id
				}).then(res => {
					this.original = true;
					uni.showToast({
						icon: "none",
						title: res.msg
					})
					this.closeReleaseShow()
				})
			},
			closeReleaseShow() {
				this.releaseShow = false;
				this.recorderUrl = '';
				this.recordLength = 0;
				this.isPlay = false;
				this.audioStatus = false;
				this.audio.stop()
			},
			//试听
			openRecord() {
				if (this.audioStatus == false) {
					this.handlePlayAudio(this.recorderUrl);
				} else {
					if (this.ispause == false) {
						this.audio.pause()
						this.ispause = true
						this.isPlay = false;
					} else {
						this.audio.play()
						this.ispause = false
						this.isPlay = true;
					}
				}
			},
			handlePlayAudio(audio) {
				let that = this
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				that.$nextTick(function() {
					that.isPlay = true;
					that.audio.src = audio;
					that.audio.play();
					that.audioStatus = true;
					that.audio.onEnded((e) => {
						that.audioStatus = false;
						that.audio.stop();
						that.isPlay = false;
						that.audio.src = '';
					})
				})
			},
			clearAudio() {
				this.recorderUrl = '';
				this.recordLength = 0;
				this.isPlay = false;
				this.audioStatus = false;
				this.audio.stop()
			},
			init() {
				this.$api('activity.getRecitePoetryList', {
					category_id: this.category_id,
					page: this.page
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						if (this.category_id == '') {
							this.category_list = res.data.category_list;
						}
						this.list = [...this.list, ...res.data.list]
					}
				})
			},
			//监听录音
			watchRecorder() {
				var that = this;
				that.recorder.onStart((e) => {
					that.recordStart()
				})
				that.recorder.onStop((e) => {
					console.log('fei')
					that.recordStop(e)
				})
			},
			recordStart(e) {
				let that = this
				console.log('recorder start' + JSON.stringify(e));
				that.recordLength = 0;
				that.recordTip = "正在录制…"
				that.recordTimer = setInterval(() => {
					that.recordLength++
				}, 1000)
			},
			recordStop(e) {
				var that = this;
				clearInterval(this.recordTimer)
				this.recording = false;
				var token = uni.getStorageSync("token");
				uni.showLoading({
					mask: true,
					title: "上传中"
				})
				uni.uploadFile({
					url: uni.getStorageSync("hostData").host + "/api/hey/" + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
					success: res => {
						res = JSON.parse(res.data)
						if (res.code === 1) {
							// that.form.audio = res.data.fullurl;
							that.recorderUrl = res.data.fullurl;
							that.recordTip = "按住录音"
						} else {
							that.$u.toast(res.msg)
						}
						uni.hideLoading()
					},
					complete: e => {}
				})

				// console.log('recorder stop' + JSON.stringify(e))
				// var token = uni.getStorageSync("token");
				// that.recording = false;
				// clearInterval(that.recordTimer)
				// uni.uploadFile({
				// 	url: uni.getStorageSync("hostData").host + "/api/hey/" + 'index/upload',
				// 	filePath: e.tempFilePath,
				// 	name: 'file',
				// 	formData: {
				// 		"token": token
				// 	},
				// 	success: res => {
				// 		res = JSON.parse(res.data)

				// 	},
				// 	complete: e => {}
				// })
			},
			clickItem(item) {
				console.log(item)
				this.selectData = item;
				this.releaseShow = true;
			},
			clickTabItem(item, index) {
				this.page = 1;
				this.tabindex = index;
				this.list = [];
				this.category_id = item.key
				this.init()
			},
			handleRecordStart(e) {
				let that = this
				// #ifdef APP-PLUS || MP-WEIXIN
				if (e.touches.length > 1) {
					return
				}
				that.recording = true
				that.recorder.start({
					format: "mp3"
				})
				// #endif
			},
			handleRecordDoing(e) {
				let that = this
				console.log('touch move')
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
			audioEmpower() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.fasong {
		width: 306rpx;
		height: 85rpx;
		background: linear-gradient(rgba(219, 255, 0, 1), rgba(128, 255, 0, 1));
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0rpx 10rpx 10rpx rgba(117, 149, 0, 0.23);
	}

	.release {
		background-image: url(@/static/bg333.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 660rpx;
		min-height: 500rpx;
		padding: 55rpx 50rpx 60rpx 50rpx;
		box-sizing: border-box;
	}

	.seach {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		height: 404rpx;
	}

	.line {
		width: 8rpx;
		height: 28rpx;
		border-radius: 36rpx;
		background: linear-gradient(rgba(255, 160, 0, 1), rgba(255, 160, 0, 0));
	}

	.line2 {
		width: 43rpx;
		height: 6rpx;
		border-radius: 29rpx;
		background: linear-gradient(rgba(128, 255, 0, 1), rgba(128, 255, 0, 0));
		margin-top: 5rpx;
	}

	.yinshiBtn {
		width: 132rpx;
		height: 55rpx;
		background-image: url(@/static/yinshiBtnBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		text-align: center;
		line-height: 55rpx;
		color: #FFA000;
		font-size: 30rpx;
	}

	.listItem {
		background-image: url(@/static/yinshiListBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 22rpx;
		height: 151rpx;
		width: 100%;
		padding: 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>