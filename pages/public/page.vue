<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar :title="data.title" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view v-if="!isAboutOur">
			<web-view :src="currentSrc"></web-view>
		</view>

		<!-- 关于我们 -->
		<view v-if="isAboutOur" style="color:rgba(0, 0, 0, 0.7);">
			<view style="text-align: center;margin-bottom: 50rpx;">关于我们</view>
			<view class="">产品不删档公测阶段，欢迎朋友们提供各种建议。可通过问题反馈或以下方式与我们联系。</view>
			<br> 联系我们：
			<br><br>
			邮箱：kefu@suoeryoude.cn
			<text @click="copy(copyEmail)">
				<img style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"
					src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
			</text>
			<br><br> 微信：yajixiaoya
			<text @click="copy(copyWechat)">
				<img style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"
					src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
			</text> <br><br>
			QQ群：704329837
			<text @click="copy(copyQQ)">
				<img style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"
					src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
			</text> <br><br>
			郑州索而有得信息科技有限公司，是一家致力于互联网软件应用的开发和运营的公司。我们致力于科技与文化的结合，利用互联网技术，传承和发扬中国传统文化。在科技快速发展的今天，世界各国的文化思想也在相互影响。我们希有更多的国人，尤其是年轻人，了解和传承我们自己的文化。
			<br><br>索而有得，坚持对科技的持续探索，希望通过稳健的技术和
			精良的产品，为客户提供坚固、扎实的软件信息服务。
		</view>
	</view>
</template>
<script>
	export default {
		name: 'page',
		data() {
			return {
				data: '',
				isUserAgreement: false, //用户协议
				isProvicy: false, //隐私政策
				isAboutOur: false,
				copyEmail: 'kefu@suoeryoude.cn',
				copyWechat: 'yajixiaoya ',
				copyQQ: '704329837',
				currentId: 0,
				currentSrc: ""
			}
		},
		onLoad() {
			let that = this
			that.getRichText()
		},
		methods: {
			// 复制
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						//调用方法成功
						console.log('success');
					}
				})
			},
			getRichText() {
				let that = this;
				if (that.$Route.query.id == 1) {
					this.currentId = 1;
					this.currentSrc = "https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/xieyi/protocol.html"
					this.isUserAgreement = true;
				}
				if (that.$Route.query.id == 2) {
					this.currentId = 2;
					this.currentSrc = "https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/xieyi/privacy.html"
					this.isProvicy = true
				}
				if (that.$Route.query.id == 3) {
					this.currentId = 3;
					this.isAboutOur = true
				}


				// that.$api('richtext.detail', {
				// 	id: that.$Route.query.id
				// }).then(res => {
				// 	that.data = res.data
				// 	console.log(res.data);
				// 	console.log(that.$Route.query.id);
				// 	if (res.data.id == 1) {
				// 		this.isUserAgreement = true
				// 	}
				// 	if (res.data.id == 2) {
				// 		this.isProvicy = true
				// 	}
				// 	if (res.data.id == 3) {
				// 		this.isAboutOur = true
				// 	}
				// })
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>