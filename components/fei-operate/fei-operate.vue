<template>
	<view class="fei-operate">
		<u-popup :show="showAction" @close="closePopup" :closeable="false" :round="30">
			<view class="operate">
				<view class="" style="padding: 50rpx 55rpx;">
					<view class="delete" @click="shield" v-if="showShield" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">屏蔽作品</view>
					</view>
					<view class="delete" @click="black" v-if="showBlack" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">加入黑名单</view>
					</view>
					<view class="delete" @click="deleteClick" v-if="showDelete" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">删除</view>
					</view>
					<view class="delete" @click="handleConcleDig" v-if="showCai" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">不喜欢/点踩</view>
					</view>
					<view class="delete" @click="deleteComment" v-if="showDeleteComment" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">删除评论</view>
					</view>
					<view class="delete" @click="report" v-if="showReport" style="margin-bottom: 36rpx;">
						<view style="font-size: 30rpx;">举报广告/色情等</view>
					</view>
					<view class="delete2" @click="close" style="">
						<view style="font-size: 30rpx;">取消</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: ['operateId', 'showDelete', "showDeleteComment", "showReport", "showBlack", "showCai", "showShield"],
		data() {
			return {
				showAction: false
			}
		},
		methods: {
			//屏蔽作品
			shield() {
				this.$emit("shield");
				this.showAction = false;
			},
			//拉黑
			black() {
				this.$emit("black");
				this.showAction = false;
			},
			//关闭
			close() {
				this.$emit("close");
				this.showAction = false;
			},
			//删除评论
			deleteComment() {
				this.$emit("deleteComment");
				this.showAction = false;
			},
			//删除
			deleteClick() {
				this.$emit("delete");
				this.showAction = false;
			},
			//显示
			show() {
				this.showAction = true;
			},
			//举报
			report() {
				this.$emit("report");
				this.showAction = false;
			},
			//点踩
			handleConcleDig() {
				this.$emit("tread");
				this.showAction = false;
			},
			closePopup() {
				this.showAction = false;
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.operate {
		background: #f7f7f7;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
	}

	.delete {
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		opacity: 1;
		text-align: center;
		height: 85rpx;
		line-height: 85rpx;
		width: 100%;
		border-radius: 44rpx;
		color: #767676;
		font-size: 32rpx;
	}

	.delete2 {
		color: #767676;
		font-size: 32rpx;
		text-align: center;
	}
</style>