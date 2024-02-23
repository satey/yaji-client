<template>
	<view>
		<block v-if="platform == 'android'">
			<u-modal :show="isRenew" :showConfirmButton="true" :background="'#fff'"
				:showCancelButton="enforce==1?false:true" confirmColor="#FFA000" @confirm="download"
				@cancel="isRenew = false">
				<view>
					<view class="renewTitle">更新内容</view>
					<scroll-view scroll-y="true" class="myScroll" style="margin-top: 30rpx;" v-if="progress">
						<view v-html="renewContent"></view>
					</scroll-view>
					<view v-if="!progress" style="margin-top: 30rpx;">
						<progress :percent="progressNum" show-info style="width: 500rpx;" />
					</view>
				</view>
			</u-modal>
		</block>

		<block v-if="platform== 'ios'">
			<u-modal :show="isRenew" :showConfirmButton="true" :confirmText="'前往更新'" :background="'#fff'"
				:showCancelButton="enforce==1?false:true" confirmColor="#FFA000" @confirm="openAppStore"
				@cancel="isRenew = false">
				<view>
					<view class="renewTitle">更新内容</view>
					<scroll-view scroll-y="true" class="myScroll" style="margin-top: 30rpx;" v-if="progress">
						<view v-html="renewContent"></view>
					</scroll-view>
					<view v-if="!progress" style="margin-top: 30rpx;">
						<progress :percent="progressNum" show-info style="width: 500rpx;" />
					</view>
				</view>
			</u-modal>
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
				platform: uni.getSystemInfoSync().platform
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
						var downloadTask = uni.downloadFile({
							url: that.downloadUrl,
							success: function(res) {
								// 安装新版本
								uni.showModal({
									title: '安装新版本',
									content: '新版本已下载完成，是否安装？',
									success: function(msg) {
										if (msg.confirm) {
											if (that.downloadFlag) {
												// #ifdef APP-PLUS
												plus.runtime.install(res.tempFilePath);
												// #endif
											}
										}
									}
								});
							}
						});
						downloadTask.onProgressUpdate((res) => {
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

<style>
</style>