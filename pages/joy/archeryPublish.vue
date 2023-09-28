<template>
	<view>
		<u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<view @click="add"
					style="width: 92rpx;height: 52rpx;color: #fff;border-radius: 50rpx;background: #FE4373;text-align: center;line-height: 50rpx;font-size: 26rpx;">
					发布</view>
			</view>
		</u-navbar>

		<view class="publish" @click="upLoadImg">
			<block v-if="archeryImg == ''">
				<view
					style="width: 100%;height: 100%;background: #F7F7F7;display: flex;flex-direction: column;align-items: center;justify-content: center;">
					<view class="ri-upload-cloud-fill" style="font-size: 50rpx;color: #808080;"></view>
					<view style="color: #3D3D3D;font-size: 28rpx;opacity: 0.6;">添加图片</view>
				</view>
			</block>
			<block v-else>
				<image :src="archeryImg" style="width: 100%;height: 100%;border-radius:10rpx ;" mode="widthFix"></image>
			</block>
		</view>
		<view style="padding: 65rpx 53rpx 40rpx 53rpx;color: #3D3D3D;opacity: 0.8;font-size: 28rpx;">
			请上传一张关键信息被覆盖的物品照片，例如用手帕覆盖一颗水果，可以看出物品的大概曲线，以便大家猜测。
		</view>
		<view style="padding: 0 53rpx 0 53rpx;">
			<view style="display: flex;font-size: 36rpx;color: #3D3D3D;">答案 <text
					style="color: #FE4373;font-size: 39rpx;margin-left: 10rpx;">*</text></view>
			<view style="margin: 36rpx; 20rpx;border: 1px solid #D8D8D8;height: 80rpx;border-radius: 5rpx;">
				<input type="text" v-model="answer" maxlength="22"
					style="width: 100%;height: 100%;padding-left: 10rpx;text-align: center;" placeholder="请勿使用任何符号"
					placeholder-style="font-size: 28rpx;color: #3D3D3D;opacity: 0.4;">
			</view>
		</view>
		<view style="padding: 0 53rpx 0 53rpx;">
			<view style="display: flex;font-size: 36rpx;color: #3D3D3D;">射辞</view>
			<view style="margin: 36rpx; 20rpx;border: 1px solid #D8D8D8;height: 152rpx;border-radius: 5rpx;">
				<textarea name="" v-model="terms" id="" cols="30" rows="10" style="padding: 20rpx;height: 100%;"
					placeholder="给一些提示吧，比如打一个什么"
					placeholder-style="font-size: 28rpx;color: #3D3D3D;opacity: 0.4;"></textarea>
				<!-- <input type="text" style="width: 100%;height: 100%;padding-left: 10rpx;" placeholder="请勿使用任何符号"
					placeholder-style="font-size: 28rpx;color: #3D3D3D;opacity: 0.4;"> -->
			</view>
		</view>
		<view style="padding: 0 53rpx 0 53rpx;">
			<view style="display: flex;font-size: 36rpx;color: #3D3D3D;">奖励</view>
			<view style="margin: 36rpx; 20rpx;border: 1px solid #D8D8D8;height: 152rpx;border-radius: 5rpx;">
				<textarea name="" v-model="reward" id="" cols="30" rows="10" style="padding: 20rpx;height: 100%;"
					placeholder="猜对奖励，比如互关"
					placeholder-style="font-size: 28rpx;color: #3D3D3D;opacity: 0.4;"></textarea>
				<!-- <input type="text" style="width: 100%;height: 100%;padding-left: 10rpx;" placeholder="请勿使用任何符号"
					placeholder-style="font-size: 28rpx;color: #3D3D3D;opacity: 0.4;"> -->
			</view>
		</view>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				archeryImg: "",
				answer: "",
				reward: "",
				terms: "",
				isPublishFlag: false,
			}
		},
		methods: {
			//发布
			add() {
				var that = this;
				var reg = new RegExp("[~#^$@%&!?%*,，.。/？]", 'g');
				if (that.archeryImg == '') {
					uni.showToast({
						icon: "none",
						title: "请添加图片"
					})
					return;
				};
				if (that.answer == '') {
					uni.showToast({
						icon: "none",
						title: "请添加答案"
					})
					return;
				} else if (that.answer.match(reg)) {
					uni.showToast({
						icon: "none",
						title: "答案不能有特殊字符"
					})
					return;
				}
				if (that.isPublishFlag) {
					return;
				}
				that.isPublishFlag = true;
				that.$api("archery.add", {
					"image": that.archeryImg,
					"answer": that.answer,
					"prompt": that.terms,
					"reward": that.reward
				}).then(res => {
					that.isPublishFlag = false;
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						uni.$emit('archeryUpdate', {
							msg: '页面更新'
						})
						that.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//上传图片
			upLoadImg() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: [],
					sourceType: ['album'],
					success: (imageRes) => {
						var token = uni.getStorageSync("token");
						uni.uploadFile({
							url: that.$API_URL + 'index/upload',
							filePath: imageRes.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								res = JSON.parse(res.data);
								console.log(res)
								if (res.code === 1) {
									that.archeryImg = res.data.fullurl
								} else {
									that.$u.toast(res.msg)
								}
							},
							complete: e => {}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish {
		width: 290rpx;
		height: 260rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		margin-top: 85rpx;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
	}
</style>