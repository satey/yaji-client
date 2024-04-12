<template>
	<view>
		<!-- 更多弹窗 -->
		<u-popup :show="morePopup" @close="morePopup = false;postId='';itemData = [];share_weixin_href = []"
			:closeable="false" :round="30">
			<view style="background:#fff;border-radius: 20rpx 20rpx 0rpx 0rpx;position: relative;">
				<u-icon @click="morePopup = false" name="close" color="#333" size="25" bold
					style="position: absolute;top: 16rpx;right: 16rpx;"></u-icon>
				<view style="text-align: center;margin-top: 23rpx;font-weight: bold;"><text
						style="color:#333;font-size: 26rpx;">更多</text>
				</view>
				<view
					style="display: flex;align-items: center;margin-top: 26rpx;padding: 0rpx 62rpx;box-sizing: border-box;margin-bottom: 50rpx;">
					<!-- <view style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;"
						@click="shareWeChat">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/fenxiang.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;white-space: nowrap;">分享到微信</view>
					</view> -->
					<block v-if="isShowShield">
						<view @click="shield" v-if="userInfo.id!=userId"
							style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;">
							<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
								src="../../static/iconImage/pingbi.png" mode=""></image>
							<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;white-space: nowrap;">屏蔽作品
							</view>
						</view>
					</block>
					<view @click="cai" v-if="userInfo.id!=userId"
						style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/diancai.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;white-space: nowrap;">不喜欢/点踩</view>
					</view>
					<view v-if="userInfo.id!=userId"
						style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;"
						@click="$u.route('/pages/public/report',{post_id:postId,type:'动态',selectId:postId})">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/jubao.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;white-space: nowrap;">举报</view>
					</view>
					<view v-if="userInfo.id==userId" @click="poseDel"
						style="display: flex;flex-direction: column;align-items: center;margin-right: 61rpx;">
						<image class="moreImgs" style="width: 96rpx;height: 96rpx;"
							src="../../static/iconImage/shanchu.png" mode=""></image>
						<view style="font-size: 23rpx;color: #333;margin-top: 15rpx;white-space: nowrap;">删除</view>
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
				share_weixin_status: 0,
				share_weixin_href: '',
				itemData: []
			}
		},
		methods: {
			shareWeChat() {
				console.log(this.itemData)
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					title: this.itemData.content == '' ?
						`来自{${this.itemData.user_info.role_realname}·${this.itemData.user_info.role_dynasty}}的动态。` :
						this.itemData.content,
					summary: `默认用动态的故事。无故事时显示:来自{${this.itemData.user_info.role_realname}·${this.itemData.user_info.role_dynasty}}的动态。`,
					imageUrl: this.itemData.image_list.length != 0 ? this.itemData.image_list[0] : this.itemData
						.bg_img_url,
					href: 'https://www.suoeryoude.cn/share?from=post&postId=' + this.itemData.post_id,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			moreShow(postId, userId, isShowShield, item) {
				this.itemData = item;
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
						uni.$emit("deletePost")
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