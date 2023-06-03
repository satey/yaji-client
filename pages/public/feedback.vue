<template>
	<view class="pagesAll">
		<view class="header">
			<u-navbar title="意见反馈" :safeAreaInsetTop="true" :placeholder="true">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>

			<!-- 标题 -->
			<view class="header-title" >
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
					<view class="pre-box" v-if="!showUploadList">
						<view class="pre-item" v-for="(item, index) in uUpload.lists" :key="index">
							<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
							<view class="u-delete-icon" @tap.stop="uUpload.deleteItem(index)">
								<u-icon name="close" size="20" color="#ffffff"></u-icon>
							</view>
							<u-line-progress v-if="item.progress > 0 && !item.error" :show-percent="false" height="16" class="u-progress"
							 :percent="item.progress"></u-line-progress>
						</view>
					</view>
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
				showUploadList: true, 
				uUpload: {}, // 组件实例
				remark:'',
				id:null,
				images:''
			}
		},
		computed: {

		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			console.log(this.$refs.uUpload);
			this.uUpload = this.$refs.uUpload;
		},
		mounted() {
		this.init()
		console.log('111');
		},
		methods: {
			init(){
				let that = this
				that.$api('user.info').then(res => {
					// console.log(res.data)/;
				    if (res.code === 1) {
					uni.setStorageSync('id',res.data.id)
				    } else {
				        that.$u.toast(res.msg)
				    }
				})
			},
			submit() {
				let that = this
				let id=	uni.getStorageSync('id')
				if(that.title!=0&&that.content.length>=10){
					that.$api('feedback.add', {
					    type: 'feedback',
						feedback_user_id:id,
					    remark:that.title,
						content:that.content,
						images:''
					}).then(res => {
					    if (res.code === 1) {
					        that.$u.toast('提交成功')
							uni.navigateTo({
								url:'/pages/public/feedbackPage',
							})
							that.content=""
							that.title=""
							
					    } else {
					        that.$u.toast(res.msg)
					    }
					})
				}else{
					that.$u.toast('按规定填写哦')
				}
				

			// console.log(this.title);
			
			
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
		height: 240rpx;
		background-color: white;
		margin-top: 20rpx;
	}

	.header-title {
		margin-left: 30rpx;
		margin-top: 30rpx;
		display: block;
		height: 60rpx;
	}

	.header-title text {
		font-size: 24rpx;
		margin-top: -2rpx;
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
		font-size: 24rpx;
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
	.wrap {
			padding: 24rpx;
		}
		
		.slot-btn {
			width: 341rpx;
			height: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgb(244, 245, 246);
			border-radius: 10rpx;
		}
	
		.slot-btn__hover {
			background-color: rgb(235, 236, 238);
		}
	
		.pre-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	
		.pre-item {
			flex: 0 0 48.5%;
			border-radius: 10rpx;
			height: 140rpx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20rpx;
		}
	
		.u-progress {
			position: absolute;
			bottom: 10rpx;
			left: 8rpx;
			right: 8rpx;
			z-index: 9;
			width: auto;
		}
	
		.pre-item-image {
			width: 100%;
			height: 140rpx;
		}
	
		.u-delete-icon {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			z-index: 10;
			background-color: $u-type-error;
			border-radius: 100rpx;
			width: 44rpx;
			height: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
</style>
