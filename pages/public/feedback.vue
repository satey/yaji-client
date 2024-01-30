<template>
	<view class="pagesAll">
		<u-navbar title="意见反馈" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<text style="font-size: 30rpx;color: #999;" @click="$u.route('/pages/public/feedbackPage')">反馈记录</text>
			</view>
		</u-navbar>
		<view class="header">
			<!-- 标题 -->
			<view class="header-title">
				<text class="header-titleText"> 标题：</text><input class="myInput" v-model="title" type="text"
					placeholder="限22字符" maxlength="22" placeholder-class="placeholderClass">
			</view>
		</view>
		<!-- 请填写您的问题 -->
		<view class="question">
			<view class="questionTitle">问题描述</view>
			<textarea name="" id="" class="myTextArea" v-model="content" cols="30" rows="10" placeholder="请填写您的问题"
				oninput="if(value<10)value=10" placeholder-class="placeholderClassTextArea"></textarea>
			<!-- <input type="text" v-model="content" oninput="if(value<10)value=10" placeholder="请填写您的问题,最少10个字哦"> -->
		</view>

		<!-- 相关图片 -->
		<view class="picture">
			<view class="questionTitle">上传描述图片</view>
			<view class="pic-board">
				<view class="imgsItem" style="position: relative;" v-for="(item,index) in imgs">
					<img :src="item" alt="" style="width: 100%;height: 100%;border-radius: 10rpx;">
					<text class="ri-close-line quxiao" @click="deleteImg(index)"></text>
				</view>
				<view class="upload" @click="openImg" v-if="imgs.length<5">
					<view style="margin-bottom: 10rpx;font-size: 50rpx;"><text class="ri-camera-fill"></text></view>
					<view>上传图片</view>
				</view>
				<!-- <view class="pre-box" v-if="!showUploadList">
					<view class="pre-item" v-for="(item, index) in uUpload.lists" :key="index">
						<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
						<view class="u-delete-icon" @tap.stop="uUpload.deleteItem(index)">
							<u-icon name="close" size="20" color="#ffffff"></u-icon>
						</view>
						<u-line-progress v-if="item.progress > 0 && !item.error" :show-percent="false" height="16"
							class="u-progress" :percent="item.progress"></u-line-progress>
					</view>
				</view>
				<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload> -->
			</view>
		</view>


		<!-- 确定按钮 -->
		<view style="padding: 30rpx;box-sizing: border-box;">
			<view
				style="border-radius: 20px;background: #FFA000;color: #fff;text-align: center;line-height: 40px;margin: 0 auto;height: 40px;"
				@click="submit"> 确定 </view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: 'feedback',
		data() {
			return {
				title: '',
				content: '',
				action: 'http://192.168.100.17/index.php/index/index/upload', // 演示地址
				showUploadList: true,
				uUpload: {}, // 组件实例
				remark: '',
				id: null,
				images: '',
				imgs: [],
				flag: true,
			}
		},
		computed: {

		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.uUpload = this.$refs.uUpload;
		},
		mounted() {
			this.init()
		},
		methods: {
			//删除图片
			deleteImg(i) {
				this.imgs.splice(i, 1)
			},
			//上传图片
			openImg() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.imgs.push(res.tempFilePaths[0]);
						var token = uni.getStorageSync("token");
						uni.uploadFile({
							url: uni.getStorageSync("hostData").host+"/api/hey/" + 'index/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 1) {
									that.imgs.push(data.data.fullurl)
								} else {
									that.$u.toast("图片上传错误")
								}
							},
						})
					}
				});
			},
			init() {
				let that = this
				that.$api('user.info').then(res => {
					// console.log(res.data)/;
					if (res.code === 1) {
						uni.setStorageSync('id', res.data.id)
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			submit() {
				let that = this;
				if (that.flag) {
					that.flag = false;
				} else {
					return;
				}
				let id = uni.getStorageSync('id');
				//描述
				if (that.content.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请输入描述"
					})
					that.flag = true;
					return;
				}
				//标题
				if (that.title.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请输入标题"
					})
					that.flag = true;
					return;
				}

				var token = uni.getStorageSync("token");
				var data = {
					type: 'feedback',
					images: that.imgs,
					content: that.content,
					title: that.title,
				};
				that.$api('feedback.add', data).then(res => {
					that.flag = true;
					if (res.code === 1) {
						that.$u.toast('提交成功')
						that.$nextTick(() => {
							uni.navigateTo({
								url: '/pages/public/feedbackPage',
							})
							that.content = ""
							that.title = ""
							that.imgs = []
						})
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			upImg(img, callback) {

			}
		}
	}
</script>
<style>
	.quxiao {
		padding: 5rpx;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		font-size: 30rpx;
		border-radius: 50%;
		position: absolute;
		top: -15rpx;
		right: -15rpx;
	}

	.imgs {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}

	.imgsItem {
		height: 150rpx;
		width: calc(100% / 4 - 20rpx);
		margin-right: 20rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}

	.pagesAll {
		background-color: rgba(0, 0, 0, 0.05);
		height: 100vh;
	}

	.header {
		background-color: white;
		padding: 30rpx;
	}

	.header-title {
		display: flex;
		align-items: center;
	}

	.header-titleText {
		color: #323232;
		font-size: 32rpx;
	}

	.placeholderClass {
		font-size: 32rpx;
		color: #ccc;
		text-align: right;
	}

	.myInput {
		flex: 1;
	}

	.question {
		margin-top: 20rpx;
		background-color: white;
		position: relative;
		padding: 30rpx;
	}

	.questionTitle {
		font-size: 32rpx;
		color: #323232;
		font-weight: bold;
	}

	.myTextArea {
		margin-top: 20rpx;
		flex: 1;
	}

	.placeholderClassTextArea {
		font-size: 28rpx;
		color: #CCCCCC;
	}

	.picture {
		background-color: white;
		margin-top: 20rpx;
		position: relative;
		padding: 30rpx;
	}

	.picture .pic {
		position: absolute;
		top: 20rpx;
		left: 30rpx;
		font-size: 24rpx;
	}

	.pic-board {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		/* border: 1rpx solid darkgrey; */
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

	/* ------------------- */
	.upload {
		width: 150rpx;
		height: 150rpx;
		color: #999;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eee;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
</style>