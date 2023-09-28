<template>
	<view>
		<u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #323232 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<i class="ri-more-2-fill " style="font-size: 38rpx;color: #333;" @click='showOperate'></i>
			</view>
		</u-navbar>
		<u-modal :show="answerActive" :showConfirmButton="false" :showCancelButton="false" confirmColor="#FE4373"
			confirmText="充值" cancelText="放弃" @cancel="answerActive=false" @confirm="">
			<view style="display: flex;flex-direction: column;width: 100%;">
				<view style="font-size: 28rpx;color: #3D3D3D;margin-bottom: 78rpx;">请填写您的答案</view>
				<input type="text" v-model="pirntAnswer" :placeholder="`正确答案为${answerLength}个字`" maxlength="22"
					placeholder-style="color:#3D3D3D;font-size:28rpx;opacity:0.5;"
					style="height: 80rpx;width: 376rpx;background: rgba(0,0,0,0.04);border-radius:5rpx;text-align: center;margin: 0 auto;">
				<view style="display: flex;align-items: center;">
					<view @click="answerActiveClose"
						style="width: 250rpx;height: 80rpx;font-size: 28rpx;color: #767676;line-height: 80rpx;text-align: center;border-radius: 8rpx;margin: 0 auto;margin-top: 66rpx;border:1px solid #C7C7C7">
						取消</view>
					<view @click="submit"
						style="width: 250rpx;height: 80rpx;font-size: 28rpx;color: #FFFFFF;line-height: 80rpx;text-align: center;background: #FE4373;border-radius: 8rpx;margin: 0 auto;margin-top: 66rpx;">
						发射</view>
				</view>
			</view>
		</u-modal>
		<view style="padding: 30rpx;box-sizing: border-box;">
			<view style="border-radius: 5rpx;overflow: hidden;">
				<image style="width: 100%;border-radius: 5rpx;" :src="detail.image" mode="widthFix"></image>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 36rpx;">
				<view style="display: flex;align-items: center;" @click.stop="openUserDetail">
					<view style="">
						<block v-if="detail.role_realname!=null">
							<!-- <image style="width: 100%;height: 100%;" :src="detail.avatar" mode="widthFix">
							</image> -->
							<image :src="detail.avatar" style="width: 44rpx;height: 44rpx;border-radius: 50%;"
								mode="aspectFill">
							</image>
						</block>
						<block v-else>
							<block v-if="detail.gender == 1">
								<image style="width: 100%;border-radius: 5rpx;" src="@/static/avatar.png"
									mode="aspectFill">
								</image>
							</block>
							<block v-else>
								<image style="width: 100%;border-radius: 5rpx;" src="@/static/avatar-female.png"
									mode="aspectFill"></image>
							</block>
						</block>
					</view>
					<view style="font-size: 28rpx;color: #323232;margin-left: 10rpx;">
						<block v-if="detail.role_realname!=null">
							{{detail.role_realname}}·{{detail.role_dynasty}}
						</block>
						<block v-else>
							<text>无名氏</text>
						</block>
					</view>
					<!-- 	<block v-if="detail.gender == 2">
						<text class="ri-women-fill"
							style="margin-left: 15rpx;color: #E87B7B;font-size: 30rpx;margin: 0rpx 13rpx;"></text>
					</block>
					<block v-if="detail.gender == 1">
						<text class="ri-men-fill"
							style="margin-left: 15rpx;color: #8FB992;font-size: 30rpx;margin: 0rpx 13rpx;"></text>
					</block> -->
					<!-- <view class="ri-men-line" style="font-size: 30rpx;color: #5E95F6;margin: 0rpx 13rpx;"></view> -->
					<image :src="detail.mw_image"
						style="width: 32rpx;height: 32rpx;margin-left: 12rpx;margin-right: 33rpx;"></image>
					<block v-if="detail.user_id==userInfo.id?false:true">
						<text class="ri-add-line" v-if="detail.is_follow != 1" @click.stop="observe"
							style="color: #fff;background: #FE4373;border-radius: 50%;font-size: 27rpx;padding: 3rpx;"></text>
					</block>
				</view>
				<view style="color:#3D3D3D ;font-size: 28rpx;opacity: 0.6;">{{detail.createtime}}</view>
			</view>
			<view style="margin-top: 36rpx;font-size: 28rpx;color: #1B1A1A;">
				<text style="opacity: 0.6;">射辞：</text>
				<text>{{detail.prompt||"无"}}</text>
			</view>
			<view style="margin-top: 26rpx;font-size: 28rpx;color: #1B1A1A;">
				<text style="opacity: 0.6;">奖励：</text>
				<text>{{detail.reward||"无"}}</text>
			</view>
			<view style="display: flex;align-items: flex-end;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<view>
						<text class="ri-chat-smile-3-line" style="font-size: 35rpx;color: #979797;"></text>
						<text style="margin-left: 10rpx;font-size: 22rpx;color: #999999;">{{detail.comment_nums}}</text>
					</view>
					<view style="margin:0rpx 30rpx;" @click="zan">
						<text v-if="detail.is_zan == 0" class="ri-heart-line"
							style="font-size: 35rpx;color: #979797;"></text>
						<text v-else class="ri-heart-fill" style="font-size: 35rpx;color: #FE4373;"></text>
						<text style="margin-left: 10rpx;font-size: 22rpx;color: #999999;">{{detail.zan_nums}}</text>
					</view>
					<block v-if="detail.user_id==userInfo.id?false:true">
						<image @click="showGift" src="@/static/cailiwu.png" style="width: 36rpx;height: 36rpx;" mode="">
						</image>
					</block>
				</view>
				<view @click="answerActive=true"
					style="width: 185rpx;height: 65rpx;background: #FE4373;border-radius: 10rpx;text-align: center;line-height: 65rpx;color: #fff;font-size: 28rpx;">
					我来射
				</view>
			</view>
			<view :style="{display:detail.is_guess == 1?'block':'none'}"
				style="font-size: 28rpx;color: #323232;opacity: 0.8;margin-top: 36rpx;">题目已被猜出，您可以 <text
					style="color: #FE4373;margin-left: 12rpx;"
					@click="showAnswer">{{showAnswerFalg==true?'显示':'隐藏'}}答案</text> </view>
		</view>
		<view style="padding: 0rpx 30rpx;box-sizing: border-box;">
			<feiComment v-show="commentList.length" :commentList='commentList' ref="feiComment" :answer="detail.answer">
			</feiComment>
			<view v-if="!commentList.length" style="padding-bottom: 50rpx;">
				<u-empty icon="/static/wupinglun.png" text="暂无人射答" textColor="#a1a1a1" marginTop="0"></u-empty>
			</view>
		</view>
		<feiOperate ref="feiOperate" @report='report' :showReport="detail.user_id==userInfo.id?false:true"
			:showDelete="detail.user_id==userInfo.id?true:false" @delete="deleteClick" @tread="tread"
			:operateId="$Route.query.archeryId"></feiOperate>
		<feiGift ref="feiGift" channel="1"></feiGift>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	import feiGift from "@/components/fei-gift/fei-gift.vue"
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	import feiComment from "@/components/fei-comment/fei-comment.vue"
	export default {
		components: {
			feiOperate,
			feiComment,
			feiGift
		},
		data() {
			return {
				detail: [],
				answerActive: false,
				answerLength: 0,
				pirntAnswer: "",
				topPage: 1,
				commentList: [],
				userInfo: [],
				showAnswerFalg: true,
			}
		},
		onLoad(e) {
			var that = this;
			that.getDetail();
			that.comment_list();
		},
		onReachBottom() {
			this.topPage++;
			this.comment_list();
		},
		methods: {
			answerActiveClose() {
				this.answerActive = false;
				this.pirntAnswer = ""
			},
			showGift() {
				this.$refs.feiGift.show();
				this.$refs.feiGift.setThird_id(this.$Route.query.archeryId);
				this.$refs.feiGift.setId(this.detail.user_id);
			},
			openUserDetail() {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				if (that.detail.user_id == userInfo.id) {
					uni.switchTab({
						url: '/pages/index/mine'
					});
				} else {
					that.$u.route('/pages/user/home', {
						user_id: that.detail.user_id
					})
				}
			},
			//关注
			observe() {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				if (that.detail.user_id == userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "不能关注自己"
					})
				} else {
					that.$api('user_follow.follow', {
						user_id: that.detail.user_id
					}).then(res => {
						if (res.code == 1) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							that.detail.is_follow = 1;
						}
					})
				}

			},
			//显示答案
			showAnswer() {
				this.showAnswerFalg = !this.showAnswerFalg;
				this.$refs.feiComment.showAnswer()
			},
			//评论顶层列表
			comment_list() {
				var that = this;
				that.$api("archery.comment_list", {
					"page": that.topPage,
					"limit": 10,
					"id": that.$Route.query.archeryId
				}).then(res => {
					if (res.code == 1) {
						that.commentList = [...that.commentList, ...res.data];
					}
				})
			},
			//提交答案
			submit() {
				var that = this;
				var reg = new RegExp("[~#^$@%&!?%*,，.。/？]", 'g');
				if (this.pirntAnswer == '') {
					uni.showToast({
						icon: "none",
						title: "请输入答案"
					})
					return;
				}
				if (that.pirntAnswer.match(reg)) {
					uni.showToast({
						icon: "none",
						title: "答案不能有特殊字符"
					})
					return;
				}
				that.$api("archery.addComment", {
					"shot_cover_id": that.$Route.query.archeryId,
					"pid": 0,
					"top_shot_cover_comment_id": 0,
					"comment": that.pirntAnswer
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "success",
							title: res.msg
						})
						if (res.data.is_guess == 1) {
							that.detail.is_guess = 1;
						}
						that.answerActive = false;
						that.pirntAnswer = "";
						that.commentList = []
						that.topPage = 1;
						that.comment_list()
					} else {
						that.answerActive = false;
						that.pirntAnswer = "";
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//删除
			deleteClick() {
				var that = this;
				that.$api("archery.del", {
					type: "1",
					id: that.$Route.query.archeryId
				}).then(res => {
					if (res.code == 1) {
						uni.$emit('archeryUpdate', {
							msg: '页面更新'
						})
						that.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					}
				})
			},
			//举报
			report() {
				var that = this;
				that.$u.route('/pages/public/report', {
					user_id: that.detail.user_id,
					type: '射覆',
					selectId: that.$Route.query.archeryId
				})
			},
			//踩
			tread() {
				var that = this;
				that.$api("archery.zan_or_cai", {
					id: that.$Route.query.archeryId,
					code: "2"
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//显示操作
			showOperate() {
				this.$refs.feiOperate.show()
			},
			//获取详情
			async getDetail() {
				var that = this;
				that.$api("archery.detail", await {
					shot_cover_id: that.$Route.query.archeryId
				}).then(res => {
					if (res.code == 1) {
						that.userInfo = uni.getStorageSync("userInfo");
						that.detail = res.data;
						that.answerLength = res.data.answer.length;
					} else if (res.code == 0) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//射覆点赞
			zan() {
				var that = this;
				that.$api("archery.zan_or_cai", {
					id: that.$Route.query.archeryId,
					code: "1"
				}).then(res => {
					if (res.code == 1) {
						that.detail.is_zan = !that.detail.is_zan;
						that.detail.zan_nums = that.detail.is_zan == true ? ++that.detail.zan_nums : --that.detail
							.zan_nums;
					}
				})
			},
		}
	}
</script>

<style>
</style>