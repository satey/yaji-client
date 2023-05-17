<template>
	
		 <view class="takeQuestion">
			 <!-- {{item}} -->
		  <view class="takeQuestion-item">
		   <!-- 话题 -->
		  <view class="question-title">#{{item.title}}</view>
		  <image class="hot" src="https://axhub.im/ax10/85ee1db375b49826/images/%E9%A6%96%E9%A1%B5/u104.svg" mode=""></image>
		  <text>{{item.hot_num}}</text>
		  <view class="pics">
		  <image :src="item.avatar[0]" class="pics-item" mode=""></image>
		<image :src="item.avatar[1]" class="pics-item" mode=""></image>
		   <image :src="item.avatar[2]" class="pics-item" mode=""></image>
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
 margin-right: 80rpx;
 /* border: 1px solid #000; */
}
.takeQuestion-item text{
 float: right;
 margin-right: -80rpx;
}
.question-title{
 margin-left: 40rpx;
 font-size: 30rpx;
 color: #169BD5;
padding-top: 20rpx;
}

.pics-item{
 width: 60rpx;
 height: 60rpx;
 margin-left: 10rpx;
 margin-top: 15rpx;
 border-radius: 50%;
 /* border: 1px solid #000; */
}
</style>
