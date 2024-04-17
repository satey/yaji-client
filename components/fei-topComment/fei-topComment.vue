<template>
	<view>
		<view class="commentBar" v-if="showCommentBar">
			<view
				style="display: flex;align-items: center;width: 100%;min-height: 100rpx;padding: 13rpx 30rpx;box-sizing: border-box;">
				<view class="flex items-center">
					<i class="ri-emotion-fill text-4xl text-gray-500"></i>
				</view>
				<view class="flex-1 flex" style="margin: 0rpx 20rpx;">
					<u-textarea v-model="message" :focus="inputFocus" :placeholder="placeholder" class="message"
						:auto-blur="true" :autoHeight="true" :adjustPosition="false" type="text"
						maxlength="200"></u-textarea>
				</view>
				<view class="flex items-center">
					<view @touchstart.prevent="doComment"
						style="width: 116rpx;height: 72rpx;text-align: center;line-height: 72rpx;border-radius: 50rpx;background:#FFA000 ;font-size: 28rpx;color: #fff;">
						发布</view>
				</view>
			</view>
			<!-- 表情 -->
			<view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" @touchstart.prevent=""
				v-if="showEmoji">
				<view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item"
					@touchstart.prevent="handleEmojiSend(item)">
					<text class="leading-none" style="font-size: 1.8rem;">{{ item }}</text>
				</view>
			</view>
			<view :style="{height:pageHeight+'px'}"></view>
		</view>

		<view class="lists" style="padding: 0rpx 36rpx;box-sizing: border-box;margin-top: 43rpx;">
			<view class="listItem" v-for="(item,index) in lists" :key="index">
				<view style="width: 96rpx;height: 96rpx;border-radius: 50%;overflow: hidden;margin-right: 26rpx;">
					<image style="width: 100%;height: 100%;" :src="item.avatar" mode=""></image>
				</view>
				<view style="flex: 1;">
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28rpx;color: #767676;" @click="openUserDetail(item)">
							{{item.realname}}·{{item.dynasty}}
						</view>
						<image style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" :src="item.mw_image"></image>
					</view>
					<view
						style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
						<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 20rpx;flex: 1;"
							hover-class="hoverClass" @longpress="operate(item)">
							{{item.poetry}}
						</view>
						<view style="display: flex;align-items: center;">
							<block v-if="item.is_zan == 0">
								<view @click="zan(item,index,'1')" class="ri-heart-line"
									style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;">
								</view>
							</block>
							<block v-else>
								<text @click="zan(item,index,'1')" class="ri-heart-fill"
									style="font-size: 35rpx;color: #FFA000;margin-right: 8rpx;"></text>
							</block>
							<text v-if="item.diggnums!=0"
								style="font-size: 28rpx;color: #808080;">{{item.diggnums}}</text>
						</view>

					</view>
					<view style="margin-top: 20rpx;color: #767676;font-size: 28rpx;">
						<text>{{item.createtime}}</text>
						<text style="margin:0rpx 56rpx;" @click="comment(item,index)">评论</text>
						<image @click="showGift(item)" src="@/static/cailiwu.png" style="width: 36rpx;height: 36rpx;"
							mode="">
						</image>
					</view>
					<!-- 回复评论 -->
					<view style="display: flex;margin-top: 20rpx;" v-for="(replyItem,replyIndex) in item.replyList"
						:key="replyItem.id">
						<view
							style="width: 45rpx;height: 45rpx;border-radius: 50%;overflow: hidden;margin-right: 26rpx;">
							<image style="width: 100%;height: 100%;" :src="replyItem.avatar" mode=""></image>
						</view>
						<view style="flex: 1;">
							<view style="display: flex;align-items: center;">
								<view style="font-size: 28rpx;color: #767676;">
									<text
										@click="openUserDetail(replyItem)">{{replyItem.role_realname}}·{{replyItem.role_dynasty}}</text>
									<block v-if="replyItem.p_role_realname!=undefined">
										<text style="margin: 0rpx 15rpx;">回复</text>
										<text
											@click="openUserDetail2(replyItem)">{{replyItem.p_role_realname}}·{{replyItem.p_role_dynasty}}</text>
									</block>
								</view>
								<image v-if="replyItem.p_role_realname==undefined"
									style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" :src="replyItem.mw_image">
								</image>
							</view>
							<view
								style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
								<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 20rpx;"
									hover-class="hoverClass">
									{{replyItem.poetry}}
								</view>
								<view style="display: flex;align-items: center;">
									<block v-if="replyItem.is_zan == 0">
										<view @click="zan(replyItem,index,'2')" class="ri-heart-line"
											style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;">
										</view>
									</block>
									<block v-else>
										<text @click="zan(replyItem,index,'2')" class="ri-heart-fill"
											style="font-size: 35rpx;color: #FFA000;margin-right: 8rpx;"></text>
									</block>
									<text v-if="replyItem.diggnums!=0"
										style="font-size: 28rpx;color: #808080;">{{replyItem.diggnums}}</text>
								</view>

							</view>
							<view style="margin-top: 20rpx;color: #767676;font-size: 28rpx;">
								<text>{{replyItem.createtime}}</text>
								<text style="margin:0rpx 56rpx;" @click="comment2(replyItem,index)">回复</text>
							</view>
						</view>
					</view>
					<view v-if="item.children_count > 0" @click="moreComment(item,index)"
						style="color: #FFA000;margin-top: 20rpx;font-size: 28rpx;">
						展开{{ item.children_count}}条回复 <text class="ri-arrow-down-s-line"
							style="font-size: 30rpx;"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['lists'],
		data() {
			return {
				showCommentBar: false,
				inputFocus: true,
				placeholder: "",
				message: "",
				showEmoji: false,
				pageHeight: 0,
				replyData: [],
				poemData:[]
			}
		},
		mounted() {
			this.watchKeyboard()
			this.getEmojiList()
		},
		methods: {
			doComment() {
				if (this.poemData.length != 0) {
					this.poemData.message = this.message;
					uni.$emit("addPoem", {
						data: this.poemData
					})
					this.message = ""
					this.poemData = [];
					this.showCommentBar = false;
				}else{
					console.log(this.lists)
					console.log(this.replyData)
				}
			},
			comment(item, index) {
				var that = this;
				that.showCommentBar = true;
				that.inputFocus = true;
				that.placeholder = `回复${item.realname}·${item.dynasty}`
				that.replyData = {
					poetry_word_id: item.poetry_word_id,
					pid: item.id,
					top_poetry_id: item.id,
				}
			},
			showGift(item) {
				this.$refs.feiGift.show();
				this.$refs.feiGift.setId(item.user_id);
			},
			openUserDetail2(item) {
				var that = this;
				if (item.p_user_id == this.userInfo.id) {
					uni.switchTab({
						url: '/pages/index/mine'
					});
				} else {
					that.$u.route('/pages/user/home', {
						user_id: item.user_id
					})
				}
			},
			openUserDetail(item) {
				var that = this;
				if (item.user_id == this.userInfo.id) {
					uni.switchTab({
						url: '/pages/index/mine'
					});
				} else {
					that.$u.route('/pages/user/home', {
						user_id: item.user_id
					})
				}
			},
			comment2(item, index) {
				var that = this;
				that.showCommentBar = true;
				that.inputFocus = true;
				that.placeholder = `回复${item.role_realname}·${item.role_dynasty}`
				that.replyData = {
					poetry_word_id: that.centerTextData.id,
					pid: item.id,
					top_poetry_id: item.top_poetry_id,
				}
			},
			moreComment(item, index) {
				let that = this;
				that.$api("poetry.reply_poetry_list", {
					page: item.replyPage,
					limit: 10,
					poetry_word_id: that.centerTextData.id,
					top_poetry_id: item.id
				}).then(res => {
					if (res.code == 1) {
						that.lists[index].replyList.push(...res.data);
						that.lists[index].children_count = that.lists[index].children_count -
							res.data.length;
						that.lists[index].replyPage++;
						that.$forceUpdate()
					}
				})
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
			showEmojiClick() {
				this.showEmoji = !this.showEmoji;
				uni.hideKeyboard()
			},
			//点击表情
			handleEmojiSend(item) {
				let that = this
				that.message += item
			},
			zan(item, index, selectId) {
				let that = this;
				that.$api("poetry.poetryZan", {
					id: item.id
				}).then(res => {
					if (res.code == 1) {
						switch (selectId) {
							case "1":
								that.lists[index].is_zan = !that.lists[index].is_zan ? 1 : 0;
								that.lists[index].diggnums = that.lists[index].is_zan ? ++that.lists[index]
									.diggnums : --
								that
									.lists[index].diggnums;
								break;
							case "2":
								that.lists[index].replyList.forEach((val1, index1) => {
									if (val1.id == item.id) {
										that.lists[index].replyList[index1].is_zan = !that.lists[index]
											.replyList[index1].is_zan ?
											1 : 0;
										that.lists[index].replyList[index1].diggnums = that.lists[index]
											.replyList[index1].is_zan ?
											++that.lists[index].replyList[index1].diggnums : --that.lists[
												index].replyList[index1].diggnums;
									}
								})
								break;
						}
						that.$forceUpdate()
					}
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			addPoem(data) {
				this.showCommentBar = true;
				this.inputFocus = true;
				this.poemData = {
					poetry_word_id: data.id,
					pid: 0,
					top_poetry_id: 0,
				}
				this.placeholder = `含有【${data.word}】字的诗句`
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
	.listItem {
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 1rpx solid #DABB7C;
		padding: 26rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.6);
		display: flex;
		margin-bottom: 36rpx;
	}

	.centerText {
		width: 350rpx;
		height: 350rpx;
		text-align: center;
		font-size: 160rpx;
		background: url(https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/image/cao.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 0 auto;
		line-height: 350rpx;
		font-family: font-test;
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
		margin-top: 28rpx;
	}

	.hoverClass {
		background: #EEEEEE;
	}
</style>