<template>
	<view>
		<u-modal :show="isRenew" :showConfirmButton="true" :background="'#fff'"
			:showCancelButton="enforce==1?false:true" confirmColor="#FFA000" @confirm="download" @cancel="renewCancel">
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
				phoneMode: uni.getSystemInfoSync().platform,
			}
		},
		created() {
			var that = this;
			that.$api("versions.index").then(res => {
				if (res.data == null) {
					return;
				}
				// #ifdef APP-PLUS
				if (this.phoneMode == "android") {
					plus.runtime.getProperty(plus.runtime.appid, (info) => {
						if (info.version != res.data.newversion) {
							that.isRenew = true;
							that.enforce = res.data.enforce;
							that.downloadUrl = res.data.downloadurl;
							that.renewContent = res.data.content
						}
					})
				}
				// #endif
			})
		},
		methods: {
			//关闭更新弹窗
			renewCancel() {
				this.isRenew = false
			},
			//下载新版本
			download() {
				var that = this;
				if (uni.getSystemInfoSync().platform == "ios") {
					// plus.runtime.launchApplication({
					// 	action: `itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8`
					// }, function(e) {
					// 	console.log('Open system default browser failed: ' + e.message);
					// });
				} else {
					if (that.downloadFlag) {
						this.progress = false;
						that.downloadFlag = false;
						var downloadTask = uni.downloadFile({
							url: that.$store.state.renew.downloadUrl,
							success: function(res) {
								uni.hideLoading()
								// 安装新版本
								uni.showModal({
									title: '安装新版本',
									content: '新版本已下载完成，是否安装？',
									success: function(msg) {
										if (msg.confirm) {
											console.log(that.downloadFlag)
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