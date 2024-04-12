<template>
	<view>
		<block v-if="platform == 'android'">
			<u-popup :show="isRenew" mode="center" :closeable="false" :round="20"
				:customStyle="{background:'transparent'}">
				<view class="renewContainer" v-if='showFlag'>
					<view style="text-align: center;">
						<image src="@/static/banben.png" style="width: 195rpx;height: 50rpx;" mode="widthFix"></image>
					</view>
					<view style="height:220rpx ;padding-left: 35rpx;margin-top: 45rpx;display: flex;">
						<image src="../../static/lin22.png" style="width: 16rpx;height: 100%;" mode=""></image>
						<view style="flex: 1;padding-left: 20rpx;display: flex;flex-direction: column;">
							<view style="color: #666666;font-size:30rpx ;margin-top: -12rpx;">V{{version}}</view>
							<scroll-view scroll-y="true" class="myScroll"
								style="color: #333;font-size: 28rpx;height: 0;box-sizing: border-box;margin-top: 20rpx;flex: 1;">
								<view v-html="renewContent">
								</view>
							</scroll-view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 75rpx;">
						<view @click="isRenew = false;" v-if="enforce==1?false:true"
							style="margin-right: 29rpx;width: 190rpx;height: 80rpx;background: #EFEFEF;border-radius: 50rpx;text-align: center;line-height: 80rpx;color: #666666;font-size: 30rpx;">
							暂不</view>
						<view @click="download" :style="{marginLeft:enforce==1?'29rpx':'0'}"
							style="margin-left: 29rpx;width: 190rpx;height: 80rpx;background: #FFA800;border-radius: 50rpx;text-align: center;line-height: 80rpx;color: #fff;font-size: 30rpx;">
							立即更新</view>
					</view>
				</view>
				<view class="rogressBar" v-if="showFlag==false">
					<view style="color: #333;font-size: 28rpx;">下载中</view>
					<view>
						<progress :percent="progressNum" activeColor="#FFA000" backgroundColor="#D9D9D9"
							style="width: 100%;" />
					</view>
					<view style="margin-top: 35rpx;"></view>
					<view @click="colseDownLoad"
						style="color: #666;font-size: 30rpx;width: 190rpx;height: 80rpx;border-radius: 50rpx;text-align: center;line-height: 80rpx;background: #EFEFEF;margin:0 auto;">
						取消
					</view>
				</view>
			</u-popup>
		</block>

		<block v-if="platform == 'ios'">
			<u-popup :show="isRenew" mode="center" :closeable="false" :round="20"
				:customStyle="{background:'transparent'}">
				<view class="renewContainer">
					<view style="text-align: center;">
						<image src="@/static/banben.png" style="width: 195rpx;height: 50rpx;" mode="widthFix"></image>
					</view>
					<view style="height:220rpx ;padding-left: 35rpx;margin-top: 45rpx;display: flex;">
						<image src="../../static/lin22.png" style="width: 16rpx;height: 100%;" mode=""></image>
						<view style="flex: 1;padding-left: 20rpx;display: flex;flex-direction: column;">
							<view style="color: #666666;font-size:30rpx ;margin-top: -12rpx;">{{version}}</view>
							<scroll-view scroll-y="true" class="myScroll"
								style="color: #333;font-size: 28rpx;height: 0;box-sizing: border-box;margin-top: 20rpx;flex: 1;">
								<view v-html="renewContent">
								</view>
							</scroll-view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 75rpx;">
						<view @click="isRenew = false;" v-if="enforce==0?false:true"
							style="margin-right: 29rpx;width: 190rpx;height: 80rpx;background: #EFEFEF;border-radius: 50rpx;text-align: center;line-height: 80rpx;color: #666666;font-size: 30rpx;">
							暂不</view>
						<view @click="openAppStore" :style="{marginLeft:enforce==1?'29rpx':'0'}"
							style="margin-left: 29rpx;width: 190rpx;height: 80rpx;background: #FFA800;border-radius: 50rpx;text-align: center;line-height: 80rpx;color: #fff;font-size: 30rpx;">
							立即更新</view>
					</view>
				</view>
			</u-popup>
		</block>
	</view>
</template>

<script>
	export default {
		name: "fei-renew",
		data() {
			return {
				isRenew: false,
				renewContent: "",
				enforce: 0,
				downloadUrl: '',
				progress: true,
				progressNum: 0,
				downloadFlag: true,
				iosAppStoraId: '',
				platform: uni.getSystemInfoSync().platform,
				version: '',
				showFlag: true,
				downloadTask: null
			}
		},
		created() {
			var that = this;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (info) => {
				console.log(info.version)
				that.$api("versions.index", {
					version: info.version
				}).then(res => {
					console.log(res)
					if (res.data == null) {
						return;
					}
					that.version = res.data.newversion;
					that.isRenew = true;
					that.enforce = res.data.enforce;
					that.downloadUrl = res.data.downloadurl;
					that.renewContent = res.data.content
					that.iosAppStoraId = Number(res.data.ios_appstore_id)
				})
			})
			// #endif
		},
		methods: {
			colseDownLoad() {
				this.showFlag = true;
				if (this.downloadTask != null) {
					this.progressNum = 0;
					this.downloadTask.abort()
					this.downloadFlag = true;
				}
			},
			//跳转appStora
			openAppStore() {
				var that = this;
				// #ifdef APP
				plus.runtime.launchApplication({
					action: `itms-apps://itunes.apple.com/cn/app/id${ that.iosAppStoraId}?mt=8`
				}, function(e) {
					console.log('Open system default browser failed: ' + e.message);
				});
				// #endif
			},
			//下载新版本
			download() {
				var that = this;
				if (uni.getSystemInfoSync().platform == "android") {
					if (that.downloadFlag) {
						that.progress = false;
						that.downloadFlag = false;
						// if (that.downloadUrl == "") {
						// 	return;
						// }
						that.showFlag = false;
						that.downloadTask = uni.downloadFile({
							url: that.downloadUrl,
							success: function(res) {
								that.showFlag = true;
								that.isRenew = false;
								// 安装新版本
								uni.showModal({
									title: '安装新版本',
									content: '新版本已下载完成，是否安装？',
									confirmColor: "#FFA000",
									success: function(msg) {
										if (msg.confirm) {
											if (that.downloadFlag) {
												// #ifdef APP-PLUS
												plus.runtime.install(res.tempFilePath);
												// #endif
											}
										} else if (msg.cancel) {
											if (that.enforce == 1) {
												that.isRenew = true;
											}
										}
									},
									fail() {
										if (that.enforce == 1) {
											that.isRenew = true;
										}
									}
								});
							},
							fail() {
								that.$u.toast("下载失败")
							}
						});
						that.downloadTask.onProgressUpdate((res) => {
							console.log(res.progress)
							that.progressNum = res.progress;
							if (parseInt(res.progress) == 100) {
								that.downloadFlag = true;
							}
						})
					} else {
						that.$u.toast("正在下载中")
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.renewContainer {
		width: 572rpx;
		height: 592rpx;
		background-image: url(/static/renewBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 45rpx 0rpx 54rpx 0rpx;
		box-sizing: border-box;
	}

	.rogressBar {
		width: 613rpx;
		height: 255rpx;
		padding: 38rpx 50rpx 30rpx 50rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 18rpx;
	}
</style>