<template>
	
		 <view class="takeQuestion">
			 <!-- {{item}} -->
		  <view class="takeQuestion-item">
		   <!-- 话题 -->
		  <view class="question-title">#{{item.tags[0]}}</view>
		  <image class="hot" src="" mode=""></image>
		  <text>9999</text>
		  <view class="pics">
		  <image :src="item.images" class="pics-item" mode=""></image>
		  <image src="" class="pics-item" mode=""></image>
		  <image src="" class="pics-item" mode=""></image>
		  <image src="" class="pics-item" mode=""></image>
		  <image src="" class="pics-item" mode=""></image>
		  </view>
		 
		  </view>
		  
		 </view>
	
</template>

<script>
	export default {
		props: {
		    item: {}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.takeQuestion-item{
 width:100%;
 height: 150rpx;
 border-bottom: 1px solid gray;
}
.hot{
 width: 30rpx;
 height: 30rpx;
 float: right;
 margin-right: 120rpx;
 border: 1px solid #000;
}
.takeQuestion-item text{
 float: right;
 margin-right: -120rpx;
}
.question-title{
 margin-left: 40rpx;
 font-size: 30rpx;
 color: #169BD5;
padding-top: 20rpx;
}
.pics{
 margin-left: 30rpx;
}
.pics-item{
 width: 60rpx;
 height: 60rpx;
 margin-left: 10rpx;
 margin-top: 15rpx;
 border-radius: 50%;
 border: 1px solid #000;
}
</style>
