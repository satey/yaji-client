<template>
	<view class="fei-comment">
		<view class="commentBar" v-if="showCommentBar">
			<view
				style="display: flex;align-items: center;width: 100%;min-height: 100rpx;padding: 13rpx 30rpx;box-sizing: border-box;">
				<view class="flex items-center" @touchstart.prevent="showEmojiClick">
					<i class="ri-emotion-fill text-4xl text-gray-500"></i>
				</view>
				<view class="flex-1 flex" style="margin: 0rpx 20rpx;">
					<u-textarea v-model="message" :focus="inputFocus" @blur='blur' :placeholder="placeholder"
						class="message" :auto-blur="true" :autoHeight="true" :adjustPosition="false" type="text"
						maxlength="200"></u-textarea>
				</view>
				<view class="flex items-center">
					<view @touchstart.prevent="doComment"
						style="width: 116rpx;height: 72rpx;text-align: center;line-height: 72rpx;border-radius: 50rpx;background:#FFA000 ;font-size: 28rpx;color: #fff;">
						发送</view>
				</view>
			</view>
			<!-- 表情 -->
			<view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
				<view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item"
					@touchstart.prevent="handleEmojiSend(item)">
					<text class="leading-none" style="font-size: 55rpx;">{{ item }}</text>
				</view>
			</view>
			<view :style="{height:pageHeight+'px'}"></view>
		</view>
		<view style="padding-bottom: 120rpx;">
			<block v-for="(item,index) in commentList" :key="index">
				<view class="commentItem">
					<image style="width: 50rpx;height: 50rpx;border-radius: 50%;margin-right: 10rpx;" :src="item.avatar"
						mode="" @click="openUserDetail(item)"></image>
					<view style="flex: 1;">
						<view style="padding-top: 10rpx;display: flex;align-items: center;"
							@click="openUserDetail(item)">
							<view style="color: #767676;font-size: 28rpx;">{{item.role_realname}}·{{item.role_dynasty}}
							</view>
							<image :src="item.mw_image" style="width: 32rpx;height: 32rpx;margin-left: 15rpx;" mode="">
							</image>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 16rpx;">
							<view class="itemCommentText" style="flex: 1;" @longpress="operate(item,'1',index)"
								hover-class="hoverClass" :style="{background:operateData.id == item.id?hoverBg:''}">
								<text
									:style="{display:showAnswerFalg==false?'block':'none'}">{{setTextHide(item.comment)}}</text>
								<block v-if="showAnswerFalg==true">
									<text v-html="setTextActive(item.comment)"></text>
								</block>
							</view>
							<view>
								<block v-if="item.is_zan == 0">
									<text @click="zan(item,'1',index)" class="ri-heart-line"
										style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;"></text>
								</block>
								<block v-else>
									<text @click="zan(item,'1',index)" class="ri-heart-fill"
										style="font-size: 35rpx;color: red;margin-right: 8rpx;"></text>
								</block>
								<text :style="{visibility:item.zan_nums >0?'':'hidden'}"
									style="color: #808080;font-size: 28rpx;visibility: ;">{{item.zan_nums}}</text>
							</view>
						</view>
						<view
							style="color: #767676;font-size: 28rpx;margin-top: 18rpx;margin-bottom: 10rpx;display: flex;align-items: center;">
							<view>{{item.createtime}}</view>
							<view @click="replyTopComment(item,index)" style="margin-left: 44rpx;">回复</view>
						</view>
						<!-- 二层评论 -->
						<view class="commentTwoList" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-for="(subItem,subIndex) in item.replyList" :key="subItem.id">
							<image style="width: 36rpx;height: 36rpx;border-radius: 50%;margin-right: 10rpx;"
								:src="subItem.avatar" mode="" @click="openUserDetail(subItem)"></image>
							<view style="flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="color: #767676;font-size: 28rpx;">
										<text
											@click="openUserDetail(subItem)">{{subItem.role_realname}}·{{subItem.role_dynasty}}</text>
										<block v-if="subItem.p_role_realname != undefined">
											<text style="margin: 0 10rpx;">回复</text>
											<text
												@click="openUserDetail2(subItem)">{{subItem.p_role_realname}}·{{subItem.p_role_dynasty}}</text>
										</block>
									</view>
									<image v-if="subItem.p_role_realname==undefined" :src="subItem.mw_image"
										style="width: 32rpx;height: 32rpx;margin-left: 15rpx;" mode="">
									</image>
								</view>
								<view
									style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 10rpx;">
									<view class="itemCommentText" style="flex: 1;"
										@longpress="operate(subItem,'2',index)" hover-class="hoverClass"
										:style="{background:operateData.id==subItem.id?hoverBg:''}">
										{{subItem.comment}}
									</view>
									<view>
										<block v-if="subItem.is_zan == 0">
											<text @click="zan(subItem,'2',index)" class="ri-heart-line"
												style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;"></text>
										</block>
										<block v-else>
											<text @click="zan(subItem,'2',index)" class="ri-heart-fill"
												style="font-size: 35rpx;color: red;margin-right: 8rpx;"></text>
										</block>
										<text :style="{visibility:subItem.zan_nums >0?'':'hidden'}"
											style="color: #808080;font-size: 28rpx;visibility: ;">{{subItem.zan_nums}}</text>
									</view>
								</view>
								<view
									style="color: #767676;font-size: 28rpx;margin-top: 10rpx;display: flex;align-items: center;">
									<view>{{subItem.createtime}}</view>
									<view @click="replyTwoComment(subItem,index)" style="margin-left: 44rpx;">回复</view>
								</view>
							</view>
						</view>
						<!-- 最新评论 -->
						<view class="commentTwoList" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-for="(newItem,newIndex) in item.newCommentList" :key="newItem.id">
							<image style="width: 36rpx;height: 36rpx;border-radius: 50%;margin-right: 10rpx;"
								:src="newItem.avatar" mode="" @click="openUserDetail(newItem)"></image>
							<view style="flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="color: #767676;font-size: 28rpx;">
										<text
											@click="openUserDetail(newItem)">{{newItem.role_realname}}·{{newItem.role_dynasty}}</text>
										<block v-if="newItem.p_role_realname != undefined">
											<text style="margin: 0 10rpx;">回复</text>
											<text
												@click="openUserDetail2(subItem)">{{newItem.p_role_realname}}·{{newItem.p_role_dynasty}}</text>
										</block>
									</view>
									<image v-if="newItem.p_role_realname==undefined" :src="newItem.mw_image"
										style="width: 32rpx;height: 32rpx;margin-left: 15rpx;" mode="">
									</image>
								</view>
								<view
									style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 10rpx;">
									<view class="itemCommentText" style="flex: 1;"
										@longpress="operate(newItem,'3',index)" hover-class="hoverClass"
										:style="{background:operateData.id==newItem.id?hoverBg:''}">
										{{newItem.comment}}
									</view>
									<view>
										<block v-if="newItem.is_zan == 0">
											<text @click="zan(newItem,'3',index)" class="ri-heart-line"
												style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;"></text>
										</block>
										<block v-else>
											<text @click="zan(newItem,'3',index)" class="ri-heart-fill"
												style="font-size: 35rpx;color: red;margin-right: 8rpx;"></text>
										</block>
										<text :style="{visibility:newItem.zan_nums >0?'':'hidden'}"
											style="color: #808080;font-size: 28rpx;visibility: ;">{{newItem.zan_nums}}</text>
									</view>
								</view>
								<view
									style="color: #767676;font-size: 28rpx;margin-top: 10rpx;display: flex;align-items: center;">
									<view>{{newItem.createtime}}</view>
									<view @click="replyTwoComment(newItem,index)" style="margin-left: 44rpx;">回复</view>
								</view>
							</view>
						</view>
						<view v-if="item.children_count > 0" style="color: #FFA000;margin-top: 5rpx;font-size: 28rpx;"
							@click="clickMort(item,index)">
							~~~ 展开{{ item.children_count}}条回复 <text class="ri-arrow-down-s-line"
								style="font-size: 30rpx;"></text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<feiOperate ref="feiOperate" :showDeleteComment="showDeleteCommentFlag" :showReport="showReportFlag"
			@report="report" @tread='tread' @close='closeOperate' @deleteComment="deleteComment" :showCai="showCai">
		</feiOperate>
	</view>
</template>

<script>
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	export default {
		props: ["commentList", "answer"],
		components: {
			feiOperate
		},
		data() {
			return {
				message: "",
				pageHeight: 0,
				emojiList: [],
				showEmoji: false,
				showCommentBar: false,
				inputFocus: false,
				placeholder: '',
				replyPage: 1,
				newCommentList: [],
				parameter: [],
				currentIndex: "",
				replyUserData: [],
				operateData: [],
				answerText: "",
				showAnswerFalg: false,
				showDeleteCommentFlag: true,
				showReportFlag: true,
				hoverBg: "",
				hoverIndex: "",
				showCai: false,
			}
		},
		mounted() {
			var that = this;
			that.watchKeyboard();
			that.getEmojiList();
		},
		watch: {
			answer(newVal, oldVal) {
				if (newVal != undefined) {
					this.answerText = newVal;
					this.setTextHide()
				}
			}
		},
		methods: {
			openUserDetail2(item) {
				var that = this;
				that.$u.route('/pages/user/home', {
					user_id: item.p_user_id
				})
			},
			openUserDetail(item) {
				var that = this;
				that.$u.route('/pages/user/home', {
					user_id: item.user_id
				})
			},
			//失去焦点
			blur() {
				var that = this;
				that.replyUserData = []
				that.currentIndex = ''
				that.parameter = [];
				that.showCommentBar = false;
				that.message = "";
				that.showEmoji = false;
			},
			//点击表情
			showEmojiClick() {
				this.showEmoji = !this.showEmoji;
				uni.hideKeyboard()
			},
			//切换星和文字
			showAnswer() {
				this.showAnswerFalg = !this.showAnswerFalg;
			},
			//把文字变红
			setTextActive(str) {
				if (str != undefined) {
					if (true) {
						return str.replace(this.answerText,
							`<text style='color:#FE7043;font-size:32rpx;'>${this.answerText}</text>`)
					}
				}
			},
			//把答案变成星
			setTextHide(str) {
				if (str != undefined) {
					if (this.answerText != '') {
						return str.replace(this.answerText, "****")
					} else {
						return str;
					}
				}
			},
			//举报
			report() {
				var that = this;
				that.hoverIndex = "";
				that.hoverBg = ''
				that.$u.route('/pages/public/report', {
					user_id: that.operateData.user_id,
					type: '射覆评论',
					selectId: that.operateData.id
				})
				that.operateData = [];
			},
			//评论点踩
			tread() {
				var that = this;
				that.$api("archery.zan_or_cai", {
					id: that.operateData.id,
					code: "2"
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						that.operateData = [];
					}
				})
				that.hoverIndex = "";
				that.hoverBg = ''
			},
			//关闭操作
			closeOperate() {
				this.operateData = [];
				this.hoverIndex = "";
				this.hoverBg = ''
			},
			//删除评论
			deleteComment() {
				var that = this;
				that.$api("archery.del", {
					type: "2",
					id: that.operateData.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						switch (that.operateData.select) {
							case "1":
								that.commentList.forEach((val, index) => {
									if (val.id == that.operateData.id) {
										that.commentList.splice(index, 1);
									}
								})
								break;
							case "2":
								that.commentList[that.operateData.index].replyList.forEach((val, index) => {
									if (val.id == that.operateData.id) {
										that.commentList[that.operateData.index].replyList.splice(index,
											1);
									}
								})
								that.$forceUpdate()
								break;
							case "3":
								that.commentList[that.operateData.index].newCommentList.forEach((val, index) => {
									if (val.id == that.operateData.id) {
										that.commentList[that.operateData.index].newCommentList.splice(
											index,
											1);
									}
								})
								that.$forceUpdate()
								break;
						}
						that.operateData = [];
					}
				})
			},
			//操作
			operate(item, select, index) {
				this.operateData = item;
				this.operateData.index = index;
				this.operateData.select = select;
				this.hoverBg = "#eee";
				this.hoverIndex = index;
				var userInfo = uni.getStorageSync("userInfo");
				if (item.user_id == userInfo.id) {
					this.showDeleteCommentFlag = true;
					this.showReportFlag = false;
					this.showCai = false;
				} else {
					this.showDeleteCommentFlag = false;
					this.showReportFlag = true;
					this.showCai = true;
				}
				this.$refs.feiOperate.show();
			},
			//评论点赞
			zan(item, select, index) {
				var that = this;
				that.$api("archery.comment_zan_or_cai", {
					id: item.id,
					code: '1'
				}).then(res => {
					if (res.code == 1) {
						switch (Number(select)) {
							case 1:
								that.commentList.forEach((val, index) => {
									if (val.id == item.id) {
										val.is_zan = !val.is_zan ? 1 : 0;
										val.zan_nums = val.is_zan ? ++val.zan_nums : --val.zan_nums;
									}
								})
								that.$forceUpdate()
								break;
							case 2:
								that.commentList[index].replyList.forEach((val, index) => {
									if (val.id == item.id) {
										val.is_zan = !val.is_zan ? 1 : 0;
										val.zan_nums = val.is_zan ? ++val.zan_nums : --val.zan_nums;
									}
								})
								that.$forceUpdate()
								break;
							case 3:
								that.commentList[index].newCommentList.forEach((val, index) => {
									if (val.id == item.id) {
										val.is_zan = !val.is_zan ? 1 : 0;
										val.zan_nums = val.is_zan ? ++val.zan_nums : --val.zan_nums;
									}
								})
								that.$forceUpdate()
								break;
						}
					}
				})
			},
			//查看更多
			clickMort(item, index) {
				var that = this;
				that.commentList[index].newCommentList = [];
				if (that.commentList[index].replyPage == undefined) {
					that.commentList[index].replyPage = 1;
				}
				that.$api("archery.reply_comment_list", {
					page: that.commentList[index].replyPage,
					limit: 10,
					shot_cover_id: that.$Route.query.archeryId,
					top_shot_cover_comment_id: item.id
				}).then(res => {
					if (res.code == 1) {
						if (that.commentList[index].replyList == undefined) {
							that.commentList[index].replyList = [];
						}
						that.commentList[index].replyList.push(...res.data);
						that.commentList[index].replyPage++;
						that.commentList[index].children_count = that.commentList[index].children_count -
							res.data.length;
						that.$forceUpdate()
					}
				})
			},
			//回复
			doComment() {
				var that = this;
				if (that.message == "") {
					uni.showToast({
						icon: "none",
						title: "请输入内容"
					})
					return;
				}
				that.parameter.comment = that.message;
				that.$api("archery.addComment", that.parameter).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "success",
							title: res.msg
						})
						var userInfo = uni.getStorageSync("userInfo");
						var newData = res.data;
						if (that.commentList[Number(that.currentIndex)].newCommentList == undefined) {
							that.commentList[Number(that.currentIndex)].newCommentList = [];
						}
						if (that.replyUserData.length != 0) {
							newData.p_role_realname = that.replyUserData.role_realname
							newData.p_role_dynasty = that.replyUserData.role_dynasty
						}
						newData.is_zan = 0
						newData.role_dynasty = userInfo.dynasty;
						newData.role_realname = userInfo.realname;
						newData.avatar = userInfo.avatar;
						that.commentList[Number(that.currentIndex)].newCommentList.push({
							...res.data
						});
						that.$forceUpdate()
						that.replyUserData = []
						that.currentIndex = ''
						that.parameter = [];
						that.showCommentBar = false;
						that.message = ""
					}
				})
			},
			//二层回复
			replyTwoComment(item, index) {
				this.placeholder = `回复${item.role_realname}·${item.role_dynasty}`;
				this.currentIndex = index;
				this.replyUserData = item;
				this.parameter = {
					"shot_cover_id": this.$Route.query.archeryId,
					"pid": item.id,
					"top_shot_cover_comment_id": item.top_shot_cover_comment_id,
				}
				this.showCommentBar = true;
				this.inputFocus = true;
			},
			//点击顶层回复
			replyTopComment(item, index) {
				this.placeholder = `回复${item.role_realname}·${item.role_dynasty}`;
				this.currentIndex = index;
				this.parameter = {
					"shot_cover_id": this.$Route.query.archeryId,
					"pid": item.id,
					"top_shot_cover_comment_id": item.id,
				}
				this.showCommentBar = true;
				this.inputFocus = true;
			},
			//隐藏输入框
			hideBar() {
				this.showCommentBar = false;
			},
			//显示输入框
			showBar() {
				this.showCommentBar = true;
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height;
					if (res.height != 0) {
						that.showEmoji = false;
					}
				})
			},
			//点击表情
			handleEmojiSend(item) {
				let that = this
				that.message += item
			},
			async getEmojiList() {
				let that = this
				if (uni.getStorageSync('EMOJILIST')) {
					that.emojiList = uni.getStorageSync('EMOJILIST')
				} else {
					that.emojiList = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍',
						'😘', '🥰', '😗', '😙', '🥲', '😚', '🙂', '🤗', '🤩', '🤔', '🫡', '🤨', '😐', '😑', '😶',
						'🫥', '😶‍🌫️', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌',
						'😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🫤', '🙃', '🫠', '🤑', '😲', '☹️', '🙁',
						'😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😮‍💨', '😰',
						'😱', '🥵', '🥶', '😳', '🤪', '😵', '😵‍💫', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕',
						'🤢', '🤮', '🤧', '😇', '🥳', '🥸', '🥺', '🥹', '🤠', '🤡', '🤥', '🤫', '🤭', '🫢', '🫣',
						'🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '👾', '🤖', '💩', '😺', '😸',
						'😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '🐵', '🐶', '🐺', '🐱', '🦁',
						'🐯', '🦒', '🦊', '🦝', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐻‍❄️', '🐨', '🐼',
						'🐸', '🦓', '🐴', '🦄', '🐔', '🐲', '🐽', '🐾', '🐒', '🦍', '🦧', '🦮', '🐕‍🦺', '🐩',
						'🐕', '🐈', '🐈‍⬛', '🐅', '🐆', '🐎', '🦌', '🦬', '🦏', '🦛', '🐂', '🐃', '🐄', '🐖', '🐏',
						'🐑', '🐐', '🐪', '🐫', '🦙', '🦘', '🦥', '🦨', '🦡', '🐘', '🦣', '🐁', '🐀', '🦔', '🐇',
						'🐿️', '🦫', '🦎', '🐊', '🐢', '🐍', '🐉', '🦕', '🦖', '🦦', '🦈', '🐬', '🦭', '🐳', '🐋',
						'🐟', '🐠', '🐡', '🦐', '🦑', '🐙', '🦞', '🦀', '🐚', '🪸', '🦆', '🐓', '🦃', '🦅', '🕊️',
						'🦢', '🦜', '🦩', '🦚', '🦉', '🦤', '🪶', '🐦', '🐧', '🐥', '🐤', '🐣', '🦇', '🦋', '🐌',
						'🐛', '🦟', '🪰', '🪱', '🦗', '🐜', '🪳', '🐝', '🪲', '🐞', '🦂', '🕷️', '🕸️', '🦠',
						'🧞‍♀️', '🧞‍♂️', '🧞', '🧟‍♀️', '🧟‍♂️', '🧟', '🧌', '🗣️', '👤', '👥', '🫂', '👁️', '👀',
						'🦴', '🦷', '👅', '👄', '🫦', '🧠', '🫀', '🫁', '🦾', '🦿', '👣', '🤺', '⛷️'
					]
					uni.setStorageSync('EMOJILIST', that.emojiList)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.commentItem {
		display: flex;
	}

	.itemCommentText {
		font-size: 32rpx;
		color: #323232;
	}

	.commentBar {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 4rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		z-index: 9999;
	}

	.message {
		min-height: 72rpx;
		background: #F7F7F7;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
	}

	.commentTwoList {
		display: flex;
	}

	.hoverClass {
		background: #ffffff;
	}
</style>