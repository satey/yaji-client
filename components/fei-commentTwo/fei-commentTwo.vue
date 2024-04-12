<template>
	<view>
		<view class="inputContainer" v-if="showInput">
			<view class="inputBox" style="padding: 15rpx 32rpx 15rpx 32rpx;box-sizing: border-box;">
				<view class="textAreaBox">
					<textarea type="text" v-model="inputMessage"
						@blur="showInput=false;inputMessage='';replyData.post_comment_id='';inputPlaceholder='回复作者'"
						auto-focus="true" confirm-type="send" placeholder-style="font-size:28rpx;color:#999999;"
						:placeholder="inputPlaceholder" auto-height="true" :adjust-position="false"
						class="myTextArea" />
				</view>
				<view class="inputBtn" @touchend.prevent="sendTextMessage">发送</view>
			</view>
			<view :style="{height:keyboardHeight+'px'}"></view>
		</view>
		<view style="padding: 15rpx 32rpx 15rpx 32rpx;box-sizing: border-box;">
			<block v-for="(item,index) in commentList" :key="index">
				<view class="commentItem">
					<image class="commentUserImg" @click="$u.route('pages/user/home',{
						user_id:item.user_info.user_id
					})" :src="item.user_info.avatar" mode="aspectFill"></image>
					<view style="flex: 1;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view class="commentUserName">
								{{item.user_info.role_realname}}·{{item.user_info.role_dynasty}}
							</view>
							<view style="display: flex;align-items: center;" @click="zan(item)">
								<block v-if="item.is_zan ==1">
									<i class="iconfont icon-aixin1"
										style="font-size: 26rpx;color: red;margin-right: 10rpx;"></i>
								</block>
								<block v-else>
									<i class="iconfont icon-aixin1"
										style="font-size: 26rpx;color: #999999;margin-right: 10rpx;"></i>
								</block>
								<view style="font-size: 22rpx;color: #999999;">{{item.diggnums}}</view>
							</view>
						</view>
						<view class="commentContent"
							:style="{background:operateData.post_comment_id==item.post_comment_id?'#eee':''}"
							@longpress="operate(item,index,'')">{{item.content}}</view>
						<view>
							<text
								style="color: #999999;font-size:22rpx ;margin-right: 16rpx;">{{item.createtime}}</text>
							<text
								style="color: #999999;font-size:22rpx ;margin-right: 16rpx;">{{item.user_info.province}}</text>
							<text style="color: #808080;font-size:22rpx ;" @click="replyComemnt(item)">回复</text>
						</view>
						<!-- 新加评论 -->
						<block v-if="item.newCommentArr.length!=0">
							<view style="width: 100%;border: 1px solid red;box-sizing: border-box;">
								<view class="commentItem">
									<image class="commentUserImg" :src="item.avatar" mode="aspectFill"
										@click="$u.route('pages/user/home',{user_id:item.user_info.user_id})">
									</image>
									<view style="flex: 1;">
										<view style="display: flex;align-items: center;justify-content: space-between;">
											<view class="commentUserName">
												{{item.role_realname}}·{{item.role_dynasty}}
											</view>
											<view style="display: flex;align-items: center;">
												<block v-if="item.is_zan ==1">
													<i class="iconfont icon-aixin1"
														style="font-size: 26rpx;color: red;margin-right: 10rpx;"></i>
												</block>
												<block v-else>
													<i class="iconfont icon-aixin1"
														style="font-size: 26rpx;color: #999999;margin-right: 10rpx;"></i>
												</block>
												<view style="font-size: 22rpx;color: #999999;">
													{{item.diggnums}}
												</view>
											</view>
										</view>
										<view class="commentContent" @longpress="operate(item,index)">{{item.content}}
										</view>
										<view>
											<text
												style="color: #999999;font-size:22rpx ;margin-right: 16rpx;">{{item.createtime}}</text>
											<text>{{item.user_info.province}}</text>
											<text style="color: #808080;font-size:22rpx ;">回复</text>
										</view>
									</view>
								</view>
							</view>
						</block>
						<!-- 老的评论 -->
						<block v-if="item.oldCommentArr.length!=0">
							<view style="width: 100%;box-sizing: border-box;"
								v-for="(oldItem,oldIndex) in item.oldCommentArr" :key="oldIndex">
								<view class="commentItem">
									<image class="commentUserImg"
										@click="$u.route('pages/user/home',{user_id:oldItem.user_info.user_id})"
										style="width: 56rpx;height: 56rpx;" :src="oldItem.user_info.avatar"
										mode="aspectFill">
									</image>
									<view style="flex: 1;">
										<view style="display: flex;align-items: center;justify-content: space-between;">
											<view class="commentUserName" style="font-size: 23rpx;color: #323232;">
												<text>{{oldItem.user_info.role_realname}}·{{oldItem.user_info.role_dynasty}}</text>
												<block v-if="oldItem.level !=1">
													<block v-if="oldItem.ori_user_info.user_id != undefined">
														<text style="color: #808080;">回复</text>
														<text>{{oldItem.ori_user_info.role_realname}}·{{oldItem.ori_user_info.role_dynasty}}</text>
													</block>
												</block>
											</view>
											<view style="display: flex;align-items: center;" @click="zan(oldItem)">
												<block v-if="oldItem.is_zan ==1">
													<i class="iconfont icon-aixin1"
														style="font-size: 26rpx;color: red;margin-right: 10rpx;"></i>
												</block>
												<block v-else>
													<i class="iconfont icon-aixin1"
														style="font-size: 26rpx;color: #999999;margin-right: 10rpx;"></i>
												</block>
												<view style="font-size: 22rpx;color: #999999;">
													{{oldItem.diggnums}}
												</view>
											</view>
										</view>
										<view class="commentContent"
											:style="{background:operateData.post_comment_id==oldItem.post_comment_id?'#eee':''}"
											@longpress="operate(oldItem,oldIndex,index)">
											{{oldItem.content}}
										</view>
										<view>
											<text
												style="color: #999999;font-size:22rpx ;margin-right: 16rpx;">{{oldItem.createtime}}</text>
											<text style="color: #808080;font-size:22rpx ;"
												@click="replyComemnt(oldItem)">回复</text>
										</view>
									</view>
								</view>
							</view>
						</block>
						<block v-if="item.chile_count!=0">
							<view v-if="item.chile_count-item.oldCommentArr.length!=0" @click="moreComment(item)">
								<text
									style="color: #FFA000;font-size:23rpx ;margin-right: 3rpx;font-weight: bold;">展开{{item.chile_count-item.oldCommentArr.length}}条回复</text>
								<i class="iconfont icon-xiala"
									style="color: #333;font-size:20rpx ;margin-left: 5rpx;"></i>
							</view>
						</block>

					</view>
				</view>
			</block>
			<u-empty v-if="!commentList.length" icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<feiOperate ref="feiOperate" @close='closeOperate' :showCai="showCai" :showReport="showReportFlag"
			@deleteComment="deleteComment" @tread='tread' @report="report" :showDeleteComment="showDeleteComment">
		</feiOperate>
	</view>
</template>

<script>
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	export default {
		props: ["commentList"],
		components: {
			feiOperate
		},
		data() {
			return {
				inputMessage: '',
				keyboardHeight: 0,
				showInput: false,
				commentData: [],
				inputPlaceholder: '回复作者',
				replyData: {},
				showDeleteComment: false,
				operateData: [],
				showReportFlag: false,
				showCai: false,
				phoneMode: uni.getSystemInfoSync().platform,
			}
		},
		created() {
			this.watchKeyboard()
		},
		methods: {
			operate(item, index, topIndex) {
				var userInfo = uni.getStorageSync("userInfo");
				if (item.user_info.user_id == userInfo.id) {
					this.showDeleteComment = true;
					this.showReportFlag = false;
					this.showCai = false;
				} else {
					this.showDeleteComment = false;
					this.showReportFlag = true;
					this.showCai = true;
				}
				if (item.ori_user_info != undefined) {
					item.index = topIndex;
				}
				this.operateData = item;
				this.$refs.feiOperate.show()
			},
			report() {
				var that = this;
				that.$u.route('/pages/public/report', {
					user_id: that.operateData.user_info.user_id,
					type: '动态评论',
					selectId: that.operateData.post_comment_id
				})
			},
			tread() {
				this.$api("comment.cai", {
					id: this.operateData.post_comment_id
				}).then(res => {
					this.$refs.feiOperate.close()
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			deleteComment() {
				this.$api("comment.del", {
					id: this.operateData.post_comment_id
				}).then(res => {
					if (this.operateData.index != undefined) {
						this.commentList[this.operateData.index].chile_count--;
						this.commentList[this.operateData.index].oldCommentArr.forEach((item, index) => {
							if (item.post_comment_id == this.operateData.post_comment_id) {
								this.commentList[this.operateData.index].oldCommentArr.splice(index, 1)
							}
						})
					} else {
						this.commentList.forEach((item, index) => {
							if (item.post_comment_id == this.operateData.post_comment_id) {
								this.commentList.splice(index, 1);
							}
						})
					}
				})
			},
			closeOperate() {
				this.operateData = [];
			},
			//传递动态信息
			getCommentData(data) {
				this.commentData = data;
			},
			showCommentBar() {
				this.showInput = true;
				if (this.replyData.post_comment_id == undefined) {
					this.inputPlaceholder = "回复作者"
				}
				this.replyData.post_id = this.commentData.post_id;
			},
			//添加评论
			sendTextMessage() {
				this.replyData.content = this.inputMessage;
				this.$api("comment.newAdd", this.replyData).then(res => {
					if (res.code == 1) {
						if (res.data.top_post_comment_id != 0) {
							this.commentList.forEach((item, index) => {
								if (item.post_comment_id == res.data.top_post_comment_id) {
									item.chile_count++;
									item.oldCommentArr = []
									item.page = 0;
									this.moreComment(item)
									this.$emit("commentReply", this.commentData, false)
								}
							})
						} else {
							this.$emit("commentReply", this.commentData, true)
						}
					}
					this.showInput = false;
					this.inputMessage = "";
					this.replyData = {};
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//回复
			replyComemnt(item) {
				this.inputPlaceholder = '回复' + item.user_info.role_realname + '·' + item.user_info.role_dynasty;
				this.replyData.post_comment_id = item.post_comment_id;
				this.showCommentBar()
			},
			//更多评论
			moreComment(item) {
				item.page++;
				this.$api("comment.new_reply_comment_list", {
					page: item.page,
					post_comment_id: item.post_comment_id
				}).then(res => {
					if (res.code == 1) {
						item.oldCommentArr.push(...res.data.list)
					}
				})
			},
			//评论点赞
			zan(item) {
				item.is_zan = item.is_zan == 0 ? 1 : 0;
				item.diggnums = item.is_zan == 0 ? --item.diggnums : ++item.diggnums
				this.$api("post_comment.dig", {
					id: item.post_comment_id
				}).then(res => {})
			},
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.keyboardHeight = res.height;
					if (res.height == 0) {
						if (this.inputMessage == '') {
							that.showInput = false;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commentItem {
		margin-top: 25rpx;
		display: flex;
		width: 100%;
		box-sizing: border-box;
	}

	.commentUserImg {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		margin-right: 15rpx;
	}

	.commentUserName {
		font-size: 23rpx;
		color: #666666;
	}

	.commentContent {
		color: #323232;
		font-size: 28rpx;
		margin-top: 15rpx;
	}

	.inputContainer {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #F2F2F2;
		z-index: 20;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.inputBox {
			width: 100vw;
			padding: 21rpx 15rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.textAreaBox {
				background: #fff;
				border-radius: 50rpx;
				max-height: 200rpx;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				overflow: hidden;
				display: flex;
				margin-right: 20rpx;
			}

			.myTextArea {
				flex: 1;
			}

			.inputBtn {
				background: #FFA000;
				border-radius: 50rpx;
				text-align: center;
				line-height: 62rpx;
				width: 125rpx;
				height: 62rpx;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
</style>