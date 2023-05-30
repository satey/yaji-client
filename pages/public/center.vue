<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar :title="data.title" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left" >
				<i  class="ri-arrow-left-s-line text-2xl "  @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center" >
				<i  class=" text-1xl " >帮助中心</i> 
			</view>
		</u-navbar>
		<view class="pt-4" style="width: 90%; margin:0 auto;">
			<!-- <rich-text :nodes="data.content"></rich-text> -->
			<!-- 关于我们 -->
			<view class="" style="color:rgba(0, 0, 0, 0.7);">
				<br> 联系我们：
				<br><br>
				邮箱：kefu@suoeryoude.cn
				<text @click="copy(copyEmail)">
					<img  style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"  src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
				</text> 
				<br><br> 微信：yajixiaoya 
				<text @click="copy(copyWechat)">
					<img  style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"  src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
				</text> <br><br>
				QQ群：543677898
				 <text @click="copy(copyQQ)">
				 	<img  style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"  src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
				 </text> <br><br>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'center',
		data() {
			return {
				data: '',
			
				copyEmail:'kefu@suoeryoude.cn',
				copyWechat:'yajixiaoya ',
				copyQQ:'543677898'
			}
		},
		onLoad() {
			let that = this
		},
		methods: {
			// 复制
			copy(value) {
			 	uni.setClipboardData({
			 	    data: value,
			    	success: function () {
			    	//调用方法成功
			        console.log('success');
			    }
			 	})
			},
			
		}
	}
</script>
<style lang="scss" scoped>

</style>
