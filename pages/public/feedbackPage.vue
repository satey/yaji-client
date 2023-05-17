<template>
	<view class="">
		<u-navbar title="意见反馈" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="questTitle">
			<text class="text1">反馈问题的标题</text>
			<text class="text2">已反馈</text>
		</view>
		<view class="questTitle">
			<text class="text1">反馈问题的标题</text>
			<text class="text2 active">已答复</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'feedbackPage',
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
	.questTitle{
		width: 90%;
		height: 80rpx;
		margin: 0 auto;
		line-height: 80rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
		border: 1rpx solid lightgray;
		border-radius: 10rpx;
		.text1{
			margin-left: 20rpx;
		}
		.text2{
			margin-left: 340rpx;
		}
	}
	.active{
		color: coral;
	}
</style>