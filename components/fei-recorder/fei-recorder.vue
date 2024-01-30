<template>
	<view>
		<view style="text-align: center;margin-top: 50rpx;color: #323232;font-size: 32rpx;"
			:style="{visibility: timerDate==0?'hidden':''}">{{timerDate}}s</view>
		<view class="flex justify-center items-center" style="margin-top: 30rpx;">
			<view v-if="operateNum == 2||operateNum == 3" @click="cancellation"
				style="width: 95rpx;height: 70rpx;background: #ECECEC;border-radius: 35rpx;text-align: center;line-height: 70rpx;margin-right: 60rpx;">
				<text class="ri-delete-bin-5-line" style="font-size: 35rpx;"></text>
			</view>
			<view class="relative flex justify-center items-center rounded-full">
				<view @click="startRecorder" class="flex justify-center items-center rounded-full z-10"
					style="background: #FE4373;width: 112rpx;height: 112rpx;">
					<i v-if="operateNum == 1" class="ri-mic-fill text-4xl leading-none text-white"
						style="font-size: 50rpx;"></i>
					<i v-if="operateNum == 2" class="ri-play-fill text-4xl leading-none text-white"
						style="font-size: 50rpx;"></i>
					<image v-if="operateNum == 3" src="@/static/bofang.gif" style="width: 80rpx;height: 45rpx;"
						mode="heightFix"></image>
				</view>
				<view v-if="recorderFlag" class="animate-ping absolute rounded-full p-2  opacity-50"
					style="background: #fe4373;">
					<view class="rounded-full  p-2  opacity-50"
						style="background: #fe4373;width: 112rpx;height: 112rpx;">
					</view>
				</view>
			</view>
			<view v-if="operateNum == 2||operateNum == 3" @click="submit"
				style="width: 95rpx;height: 70rpx;background: #FE4373;border-radius: 35rpx;text-align: center;line-height: 70rpx;margin-left: 60rpx;">
				<text class="ri-check-fill" style="font-size: 35rpx;color: #fff;"></text>
			</view>
		</view>
		<view :style="{visibility:recorderFlag?'':'hidden'}"
			style="text-align: center;margin-top: 50rpx;color: #323232;font-size: 32rpx;">
			正在录音…</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recorder: uni.getRecorderManager(),
				recorderFlag: false,
				operateNum: 1,
				timerInter: null,
				timerDate: 0,
				recordUrl: "",
				isPlay: false,
				audio: null,
			}
		},
		created() {
			this.onChangeRecorder()
		},
		destroyed() {
			if (this.audio != null) {
				this.audio.stop()
				this.audio.destroy();
				this.audio = null;
			}
			this.recorder.stop()
		},
		methods: {
			stopAudio() {
				if (this.audio != null) {
					this.audio.stop()
					this.audio.destroy();
					this.audio = null;
				}
			},
			stopRecorder() {
				this.recorder.stop();
			},
			submit() {
				this.$emit("getAudioUrl", {
					url: this.recordUrl,
					timer: this.timerDate
				})
				this.operateNum = 1;
				this.timerDate = 0;
				this.isPlay = false;
				this.recordUrl = "";
				if (this.audio != null) {
					this.audio.stop()
					this.audio.destroy()
					this.audio = null;
				}
			},
			cancellation() {
				this.operateNum = 1;
				this.timerDate = 0;
				this.isPlay = false;
				this.recordUrl = "";
				this.$emit("cancellation")
				if (this.audio != null) {
					this.audio.stop()
					this.audio.destroy()
					this.audio = null;
				}
			},
			startRecorder() {
				var that = this;
				if (that.recordUrl != "") {
					if (that.isPlay) {
						that.audio.pause()
					} else {
						that.operateNum = 3;
						that.playAudio(that.recordUrl);
					}
					return;
				}
				if (this.recorderFlag == false) {
					that.timerDate = 1;
					that.$emit("recorderStart")
					that.recorder.start({
						format: "mp3"
					})
				} else {
					uni.showLoading()
					that.recorder.stop({
						format: "mp3"
					})
				}
				this.recorderFlag = !this.recorderFlag;
			},
			//播放音频
			playAudio(url) {
				var that = this;
				if (that.audio == null) {
					that.audio = uni.createInnerAudioContext();
				}
				that.audio.src = url;
				that.$nextTick(function() {
					that.audio.play();
					that.isPlay = true;
					that.audio.onEnded((e) => {
						that.isPlay = false;
						that.operateNum = 2;
					})
					that.audio.onPause((e) => {
						that.operateNum = 2;
						that.isPlay = false;
					})
				})
			},
			//开始录音
			onChangeRecorder() {
				var that = this;
				that.recorder.onStart((e) => {
					console.log("开始录音")
					that.timerInter = setInterval(() => {
						that.timerDate++;
					}, 1000)
				})
				that.recorder.onStop((e) => {
					console.log("停止录音")
					clearInterval(that.timerInter);
					that.timerInter = null;
					that.recordStop(e)
				})
			},
			recordStop(e) {
				console.log(e)
				var that = this;
				var token = uni.getStorageSync("token");
				uni.uploadFile({
					url: uni.getStorageSync("hostData").host+"/api/hey/" + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
					success: resData => {
						var res = JSON.parse(resData.data)
						if (res.code === 1) {
							uni.hideLoading()
							that.operateNum = 2;
							that.recordUrl = res.data.fullurl;
						} else {
							that.$u.toast(res.msg)
						}
					},
					complete: e => {}
				})
			},
		}
	}
</script>

<style>
</style>