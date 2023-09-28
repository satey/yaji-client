<template>
	<view>
		<u-navbar title="举报" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding-left: 30rpx;padding-bottom: 30rpx;">
			<view style="font-size: 32rpx;color: #323232;font-weight: 500;">请选择分类</view>
			<view class="reportList">
				<view @click="selectType(item,index)" :class="selectIndex == index?'reportItemActive':''"
					class="reportItem" v-for="(item,index) in ListFeedbackType">{{item}}
				</view>
			</view>
		</view>
		<view style="padding: 30rpx;border-top:16rpx  solid #F7F7F7 ;">
			<view style="font-size: 32rpx;color: #323232;font-weight: 500;">请补充说明</view>
			<textarea name="" v-model="reportValue" cols="30" rows="10" placeholder="请输入"
				style="margin-top: 30rpx;font-size: 28rpx;"></textarea>
		</view>
		<view style="padding: 30rpx;border-top:16rpx  solid #F7F7F7 ;">
			<view style="font-size: 32rpx;color: #323232;font-weight: 500;">上传描述图片<text
					style="color: #A9A8A8;font-size: 26rpx;">（最多上传三张）</text></view>
			<view style="display: flex;align-items: center;">
				<view class="imgsItem" style="position: relative;" v-for="(item,index) in imgs">
					<image :src="item" mode="aspectFit" alt="" style="width: 100%;height: 100%;border-radius: 10rpx;">
					</image>
					<text class="ri-close-line quxiao" @click="deleteImg(index)"></text>
				</view>
				<view class="upload" @click="openImg" v-if="imgs.length<3">
					<view style="margin-bottom: 10rpx;font-size: 50rpx;"><text class="ri-camera-fill"></text></view>
					<view>上传图片</view>
				</view>
			</view>
		</view>
		<view class="reportBtnBox">
			<view class="reportBtn" @click="submit">提交举报</view>
		</view>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	export default {
		name: "report",
		data() {
			return {
				ListFeedbackType: ['色情低俗', '政治敏感', '造谣传谣', '广告欺诈', '侵犯权益', '其他'],
				reportValue: "",
				reportType: "",
				imgs: [],
				selectIndex: -1,
			}
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
						that.imgs.push(res.tempFilePaths[0]);
					}
				});
			},
			//选择类型
			selectType(text, index) {
				console.log(this.$Route.query.type)
				this.reportType = text;
				this.selectIndex = index;
			},
			//提交
			submit() {
				var that = this;
				if (this.reportType == "") {
					that.$u.toast("请选择类型");
					return;
				}
				if (this.reportValue == '') {
					that.$u.toast("请填写内容");
					return;
				}
				var token = uni.getStorageSync("token");
				if (this.imgs.length == 0) {
					that.submitActive([])
				} else {
					var imgArr = [];
					that.imgs.forEach((val, index) => {
						uni.uploadFile({
							url: that.$API_URL + 'index/upload',
							filePath: val,
							name: 'file',
							formData: {
								"token": token
							},
							success(res) {
								var data = JSON.parse(res.data)
								imgArr.push(data.data.fullurl)
								if (index == that.imgs.length - 1) {
									that.submitActive(imgArr)
								}
							}
						})
					})
				}
			},
			//封装提交
			submitActive(imgArr) {
				var that = this;
				console.log(that.$Route.query.type)
				var remark = ''
				if (that.$Route.query.type == '曲水流觞') {
					remark = that.reportType + `,类型:${that.$Route.query.type}`
				} else {
					remark = that.reportType +
						`,类型:${that.$Route.query.type},${that.$Route.query.type}id:${that.$Route.query.selectId}`
				}
				console.log(remark)
				that.$api('feedback.add', {
					type: 'report',
					content: that.reportValue,
					remark: remark,
					title: "",
					images: imgArr,
					feedback_user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.$u.toast('举报成功');
						that.reportValue = ''
						that.reportType = ''
						that.selectIndex = -1;
						that.imgs = []
					} else {
						that.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imgsItem {
		height: 150rpx;
		width: calc(100% / 4 - 20rpx);
		margin-right: 50rpx;
		margin-top: 30rpx;
		border-radius: 10rpx;
		position: relative;
	}

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

	.reportBtnBox {
		width: 100%;
		padding: 0rpx 30rpx;
		position: absolute;
		bottom: 30rpx;
		left: 0rpx;
		right: 00rpx;
		box-sizing: border-box;
	}

	.reportBtn {
		border-radius: 43rpx;
		background: #FE4373;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 0 auto;
		height: 85rpx;
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

	.reportList {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.reportItem {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		border: 1px solid #CCCCCC;
		margin-right: 30rpx;
		padding: 0rpx 25rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
		color: #323232;
		transition: all 0.3s;
	}

	.reportItemActive {
		background: rgba(254, 67, 115, 0.1) !important;
		border: 1rpx solid #FE4373 !important;
	}
</style>