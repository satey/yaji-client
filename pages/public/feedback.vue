<template>
	<view class="pagesAll">
		<view class="header">
			<u-navbar title="意见反馈" :safeAreaInsetTop="true" :placeholder="true">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>

			<!-- 标题 -->
			<view class="header-title">
				<text> 标题：</text><input  v-model="title" type="text" placeholder="限22字符" maxlength="22">
			</view>
		</view>
		<!-- 请填写您的问题 -->
		<view class="question">
			<input type="text" v-model="content" oninput="if(value<10)value=10" placeholder="请填写您的问题,最少10个字哦">
		</view>

		<!-- 相关图片 -->
		<view class="picture">
			<view class="pic">相关图片</view>
			<view class="pic-board">
				<!-- <image src="https://axhub.im/ax10/85ee1db375b49826/images/%E6%84%8F%E8%A7%81%E5%8F%8D%E9%A6%88/u10.svg"
					mode=""></image> -->
					<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action"> 
								<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
									<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
								</view>
							</u-upload>
			</view>
		</view>
		
		
		<!-- 确定按钮 -->
		<view class="btn" @click="submit"> 确定 </view>

	</view>
</template>

<script>
	export default {
		name: 'feedback',
		data() {
			return {
				title:'',
				content:'',
				action: 'http://192.168.100.17/index.php/index/index/upload', // 演示地址
								showUploadList: false, 
								uUpload: {}, // 组件实例
			}
		},
		computed: {

		},onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.uUpload = this.$refs.uUpload;
		},
		methods: {
			submit() {
			console.log(this.title);
			console.log(this.content);
			
			}
		}
	}
</script>
<style>
	.pagesAll {
		background-color: rgba(0, 0, 0, 0.05);
		height: 100vh;
	}

	.header {
		height: 200rpx;
		background-color: white;
	}

	.header-title {
		margin-left: 40rpx;
		margin-top: 50rpx;
	}

	.header-title text {
		float: left;
	}

	.header-title input {
		width: 500rpx;
		font-size: 24rpx;
	}

	.question {
		height: 380rpx;
		margin-top: 20rpx;
		background-color: white;
		position: relative;
	}

	.question input {
		width: 95%;
		height: 300rpx;

		position: absolute;
		top: 30rpx;
		left: 20rpx;
		font-size: 20rpx;

	}

	.picture {
		height: 260rpx;
		background-color: white;
		margin-top: 20rpx;
		position: relative;
	}

	.picture .pic {
		position: absolute;
		top: 20rpx;
		left: 30rpx;
	}

	.pic-board {
		width: 100rpx;

		height: 150rpx;
		position: absolute;
		top: 80rpx;
		left: 30rpx;
		/* border: 1rpx solid darkgrey; */
	}

	.pic-board image {
		width: 50rpx;
		height: 50rpx;
		margin-top: 45rpx;
		margin-left: 25rpx;
	}

	.btn {
		width: 600rpx;
		height: 80rpx;
		margin: 0 auto;
		margin-top: 50rpx;
		background-color: rgb(2, 167, 240);
		border-radius: 10rpx;
		color: aliceblue;
		font-size: 30rpx;
		line-height: 80rpx;
		text-align: center;
	}
</style>
