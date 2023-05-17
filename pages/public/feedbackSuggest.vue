<template>
	<view class="">
		<u-navbar title="意见反馈" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="feedbackTop">
			<view class=""><text class="font1">20222年11月22日  13:38</text> <text class="font2">反馈：</text> </view>
			<view class="content">
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
			</view>
		</view>
		<view class="feedbackBack">
			<view class=""><text class="font1">20222年11月22日  13:38</text> <text class="font2">答复：</text> </view>
			<view class="content">
				ksggggggggggggggggggggggxunsssudnxcjxkbcskfuiyxnsigxygnskdsbsuc
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'feedbackSuggest',
		data() {
			return {
				
			}
		},
		computed: {
	
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.feedbackTop{
		border-bottom: 1rpx solid darkgray;
	}
	.font1{
		display: inline-block;
		color: gray;
		font-size: 25rpx;
		margin-top: 30rpx;
		margin-left: 60rpx;
	}
	.font2{
		font-size: 27rpx;
		color: grey;
		margin-left: 20rpx;
	}
	.content{
		
		margin-top: 20rpx !important;
		width: 85%;
		margin: 0 auto;
		 word-break:break-all ;	
		 font-size: 26rpx;
		 padding-bottom: 30rpx;
	}
</style>