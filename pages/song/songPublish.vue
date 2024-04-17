<template>
	<view>
		<u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<view @click="publish"
					style="width: 92rpx;height: 52rpx;color: #fff;border-radius: 50rpx;background: #FFA000;text-align: center;line-height: 50rpx;font-size: 26rpx;">
					发布</view>
			</view>
		</u-navbar>
		<view class="publish" @click="upLoadImg2">
			<block v-if="songImg == ''">
				<view
					style="width: 100%;height: 100%;background: #F7F7F7;display: flex;flex-direction: column;align-items: center;justify-content: center;">
					<view class="ri-upload-cloud-fill" style="font-size: 50rpx;color: #808080;"></view>
					<view style="color: #3D3D3D;font-size: 28rpx;opacity: 0.6;">添加图片</view>
				</view>
			</block>
			<block v-else>
				<image :src="songImg" style="width: 100%;height: 100%;border-radius:10rpx ;" mode="aspectFill"></image>
			</block>
		</view>
		<view style="padding: 0rpx 53rpx;font-size: 28rpx;color: #3D3D3D;opacity: 0.8;margin-top: 65rpx;">
			您可以上传一张图片作为背景，若未上传则默认使用个人中心背景。此为可选操作。
		</view>
		<view style="padding: 0 53rpx 0 53rpx;margin-top: 88rpx;">
			<view style="display: flex;font-size: 36rpx;color: #3D3D3D;display: flex;align-items: center;">
				<text>歌名或主题</text>
				<text style="font-size: 28rpx;color: #3D3D3D;opacity: 0.6;margin-left: 15rpx;">(选填)</text>
			</view>
			<view style="margin: 36rpx; 20rpx;border: 1px solid #D8D8D8;height: 80rpx;border-radius: 5rpx;">
				<input type="text" v-model="songName" maxlength="22"
					style="width: 100%;height: 100%;padding-left: 10rpx;text-align: center;padding-right: 10rpx;box-sizing: border-box;"
					placeholder="限22字以内" placeholder-style="font-size: 28rpx;color: #3D3D3D;opacity: 0.4;">
			</view>
		</view>
		<view style="padding: 0 53rpx 0 53rpx;margin-top: 56rpx;">
			<view style="display: flex;font-size: 36rpx;color: #3D3D3D;">歌声<text
					style="color: #FFA000;font-size: 39rpx;margin-left: 10rpx;">*</text></view>
			<view v-if="recordUrl!= ''" style="display: flex;align-items: center;margin-left: 46rpx;margin-top: 36rpx;">
				<view class="yuyin" @click="bofang">
					<view style="display: flex;align-items: center;">
						<text v-if="operateNum == 1" class="ri-voiceprint-line" style="color: #fff;font-size: 35rpx;"
							v-for="(item,index) in 2" :key="index">
						</text>
						<image v-if="operateNum == 2" src="@/static/bofang.gif" style="width: 80rpx;height: 45rpx;"
							mode="heightFix"></image>
					</view>
					<text style="color: #fff;font-size: 25rpx;">{{timer}}''</text>
				</view>
				<view @click="renew" style="margin-left: 30rpx;font-size: #3D3D3D;color: 28rpx;opacity: 0.8;">重新录</view>
			</view>
			<feiRecorder @getAudioUrl="getAudioUrl" v-if="recordUrl== ''"></feiRecorder>
		</view>
		<feiqslsHit></feiqslsHit>
		<feiauthority ref="authority" @imageEmpower='imageEmpower'></feiauthority>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	import feiRecorder from "@/components/fei-recorder/fei-recorder.vue"
	export default {
		components: {
			feiRecorder
		},
		data() {
			return {
				songImg: "",
				songName: "",
				recordUrl: "",
				timer: '',
				isPlay: false,
				operateNum: 1,
				audio: null
			}
		},
		onUnload() {
			if (this.audio != null) {
				this.audio.stop()
				this.audio.destroy();
				this.audio = null;
			}
		},
		onHide() {
			if (this.audio != null) {
				this.audio.stop()
				this.audio.destroy()
				this.audio = null;
			}
		},
		methods: {
			publish() {
				let that = this;
				if (that.recordUrl == '') {
					uni.showToast({
						icon: "none",
						title: "请上传歌声"
					})
					return;
				}
				that.$api("song.songPublish", {
					background_image: that.songImg,
					song_title: that.songName,
					voice: that.recordUrl,
					duration_time: that.timer
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						uni.$emit('songUpdate', {
							msg: '页面更新'
						})
						that.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			bofang() {
				var that = this;
				if (this.isPlay == false) {
					this.playAudio(this.recordUrl)
				} else {
					that.audio.pause()
				}
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
					that.operateNum = 2;
					that.audio.onEnded((e) => {
						that.isPlay = false;
						that.operateNum = 1;
					})
					that.audio.onPause((e) => {
						that.operateNum = 1;
						that.isPlay = false;
					})
				})
			},
			renew() {
				this.recordUrl = "";
				this.timer = "";
				this.audio.stop()
			},
			getAudioUrl(e) {
				this.recordUrl = e.url;
				this.timer = e.timer;
			},
			upLoadImg2() {
				// #ifdef APP
				this.$refs.authority.show('image')
				// #endif
				// #ifdef H5
				this.upLoadImg()
				// #endif
			},
			imageEmpower() {
				this.upLoadImg()
			},
			//上传图片
			upLoadImg() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: [],
					sourceType: ['album'],
					success: (imageRes) => {
						var token = uni.getStorageSync("token");
						uni.uploadFile({
							url: uni.getStorageSync("hostData").host + "/api/hey/" + 'index/upload',
							filePath: imageRes.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								res = JSON.parse(res.data);
								console.log(res)
								if (res.code === 1) {
									that.songImg = res.data.fullurl
								} else {
									that.$u.toast(res.msg)
								}
							},
							complete: e => {}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yuyin {
		width: 275rpx;
		height: 65rpx;
		// background: #FF6D93;
		background: #FFA000;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 40rpx;
		box-sizing: border-box;
	}

	.publish {
		width: 290rpx;
		height: 260rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		margin-top: 85rpx;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
	}
</style>