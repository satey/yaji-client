<template>
	<view>
		<!-- 更多弹窗 -->
		<u-popup :show="morePopup" @close="morePopup = false;postId=''" :closeable="true" :round="30">
			<view style="background:#fff;border-radius: 20rpx 20rpx 0rpx 0rpx;">
				<view style="text-align: center;margin-top: 23rpx;"><text style="color:#333;font-size: 26rpx;">更多</text>
				</view>
				<view
					style="display: flex;align-items: center;margin-top: 26rpx;padding: 0rpx 62rpx;box-sizing: border-box;margin-bottom: 50rpx;">
					<!-- <view style="display: flex;flex-direction: column;align-items: center;">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/fenxiang.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;">分享到微信</view>
					</view> -->
					<block v-if="isShowShield">
						<view @click="shield" v-if="userInfo.id!=userId"
							style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;">
							<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
								src="../../static/iconImage/pingbi.png" mode=""></image>
							<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;">屏蔽作品</view>
						</view>
					</block>
					<view @click="cai" v-if="userInfo.id!=userId"
						style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/diancai.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;">不喜欢/点踩</view>
					</view>
					<view v-if="userInfo.id!=userId"
						style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;"
						@click="$u.route('/pages/public/report',{post_id:postId,type:'动态',selectId:postId})">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/jubao.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;">举报</view>
					</view>
					<view v-if="userInfo.id==userId" @click="poseDel"
						style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/shanchu.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;">删除</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				morePopup: false,
				postId: '',
				userId: "",
				userInfo: uni.getStorageSync("userInfo"),
				isShowShield: true,
			}
		},
		methods: {
			moreShow(postId, userId, isShowShield) {
				this.morePopup = true;
				this.postId = postId;
				this.userId = userId;
				this.isShowShield = isShowShield;
			},
			cai() {
				this.$api("post.cai", {
					post_id: this.postId
				}).then(res => {
					this.morePopup = false;
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//屏蔽
			shield() {
				this.$emit("shield", this.postId)
				this.morePopup = false
			},
			//删除动态
			poseDel() {
				this.$api('post.del', {
					post_id: this.postId
				}).then(res => {
					if (res.code == 1) {
						this.morePopup = false;
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						let timeout = setTimeout(() => {
							clearTimeout(timeout)
							this.$u.route({
								type: 'navigateBack',
								delta: 1
							})
						}, 1000)
					}
				})
			}
		}
	}
</script>

<style>
</style>