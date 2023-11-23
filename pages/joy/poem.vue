<template>
	<view style="background: #FFFBF4;height: 100%;min-height: 100vh;">
		<u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #323232 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<i class="ri-menu-line" style="color: #333 !important;font-size: 30rpx;"
					@click="$u.route('pages/joy/wineList')"></i>
			</view>
		</u-navbar>
		<view class="commentBar" v-if="showCommentBar">
			<view
				style="display: flex;align-items: center;width: 100%;min-height: 100rpx;padding: 13rpx 30rpx;box-sizing: border-box;">
				<view class="flex items-center" @touchstart.prevent="showEmojiClick">
					<i class="ri-emotion-fill text-4xl text-gray-500"></i>
				</view>
				<view class="flex-1 flex" style="margin: 0rpx 20rpx;">
					<u-textarea v-model="message" :focus="inputFocus" @blur="blur" :placeholder="placeholder"
						class="message" :auto-blur="true" :autoHeight="true" :adjustPosition="false" type="text"
						maxlength="200"></u-textarea>
				</view>
				<view class="flex items-center">
					<view @touchstart.prevent="submit"
						style="width: 116rpx;height: 72rpx;text-align: center;line-height: 72rpx;border-radius: 50rpx;background:#FE4373 ;font-size: 28rpx;color: #fff;">
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
		<view class="centerText">{{centerText.word}}</view>
		<view style="text-align: center;font-size: 44rpx;color: #3D3D3D;margin-top: 30rpx;">今日诗令</view>
		<view @click="addPoem"
			style="width: 280rpx;height: 92rpx;text-align: center;line-height: 92rpx;color: #fff;border-radius: 10rpx;font-size: 32rpx;margin: 50rpx auto;background: #FE4373;">
			发布诗句
		</view>
		<view style="font-size: 30rpx;color: #3D3D3D;text-align: center;" @click="$u.route('pages/joy/wine')">
			<text>选字结缘</text>
			<text class="ri-arrow-right-s-line"></text>
		</view>
		<view class="lists" style="padding: 0rpx 36rpx;box-sizing: border-box;margin-top: 43rpx;">
			<u-empty v-if="!lists.length" icon="/static/null.png" text="暂无内容" textColor="#a1a1a1"
				marginTop="100"></u-empty>
			<view class="listItem" v-for="(item,index) in lists" :key="index">
				<view style="width: 96rpx;height: 96rpx;border-radius: 50%;overflow: hidden;margin-right: 26rpx;">
					<image @click="openHome(item)" style="width: 100%;height: 100%;" :src="item.avatar"
						mode="aspectFill"></image>
				</view>
				<view style="flex: 1;">
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28rpx;color: #767676;" @click="openHome(item)">
							{{item.realname}}·{{item.dynasty}}
						</view>
						<image style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" :src="item.mw_image"></image>
					</view>
					<view
						style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
						<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 50rpx;"
							hover-class="hoverClass" :style="{background:replyData.id==item.id?'#eee':''}"
							@longpress="operate(item,'0',index)">
							{{item.poetry}}
						</view>
						<view style="display: flex;align-items: center;">
							<block v-if="item.is_zan == 0">
								<view @click="zan(item,index,1)" class="ri-heart-line"
									style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;">
								</view>
							</block>
							<block v-else>
								<text @click="zan(item,index,1)" class="ri-heart-fill"
									style="font-size: 35rpx;color: #FE4373;margin-right: 8rpx;"></text>
							</block>
							<text v-if="item.diggnums!=0"
								style="font-size: 28rpx;color: #808080;">{{item.diggnums}}</text>
						</view>
					</view>
					<view style="margin-top: 20rpx;color: #767676;font-size: 28rpx;display: flex;align-items: center;">
						<text>{{item.createtime}}</text>
						<text style="margin:0rpx 56rpx;" @click="addComment(item)">评论</text>
						<block v-if="item.user_id==userInfo.id?false:true">
							<image @click="showGift(item)" src="@/static/cailiwu.png"
								style="width: 36rpx;height: 36rpx;" mode="">
							</image>
						</block>
					</view>
					<!-- gengduo -->
					<block>
						<view style="display: flex;margin-top: 23rpx;" v-for="(replyItem,replyIndex) in item.replyList"
							:key="replyItem.id">
							<view
								style="width: 36rpx;height: 36rpx;border-radius: 50%;overflow: hidden;margin-right: 15rpx;">
								<image @click="openHome(replyItem)" style="width: 100%;height: 100%;"
									:src="replyItem.avatar" mode="aspectFill"></image>
							</view>
							<view style="flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="font-size: 28rpx;color: #767676;" @click="openHome(replyItem)">
										<text>{{replyItem.role_realname}}·{{replyItem.role_dynasty}}</text>
										<block v-if="replyItem.p_role_realname!=undefined">
											<text style="margin: 0rpx 15rpx;">回复</text>
											<text>{{replyItem.p_role_realname}}·{{replyItem.p_role_dynasty}}</text>
										</block>
									</view>
									<image v-if="replyItem.p_role_realname==undefined"
										style="width: 32rpx;height: 32rpx;margin-left: 11rpx;"
										:src="replyItem.mw_image">
									</image>
								</view>
								<view
									style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
									<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 50rpx;"
										hover-class="hoverClass"
										:style="{background:replyData.id==replyItem.id?'#eee':''}"
										@longpress="operate(replyItem,'1',index)">
										{{replyItem.poetry}}
									</view>
									<view style="display: flex;align-items: center;">
										<block v-if="replyItem.is_zan == 0">
											<view @click="zan(replyItem,index,2)" class="ri-heart-line"
												style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;">
											</view>
										</block>
										<block v-else>
											<text @click="zan(replyItem,index,2)" class="ri-heart-fill"
												style="font-size: 35rpx;color: #FE4373;margin-right: 8rpx;"></text>
										</block>
										<text v-if="replyItem.diggnums!=0"
											style="font-size: 28rpx;color: #808080;">{{replyItem.diggnums}}</text>
									</view>
								</view>
								<view style="margin-top: 20rpx;color: #767676;font-size: 28rpx;">
									<text>{{replyItem.createtime}}</text>
									<text style="margin:0rpx 56rpx;" @click="replyComment(replyItem)">回复</text>
								</view>
							</view>
						</view>
					</block>
					<!-- xin -->
					<block>
						<view style="display: flex;margin-top: 15rpx;" v-for="(newItem,newIndex) in item.newList"
							:key="newItem.id">
							<view
								style="width: 36rpx;height: 36rpx;border-radius: 50%;overflow: hidden;margin-right: 15rpx;">
								<image @click="openHome(newItem)" style="width: 100%;height: 100%;"
									:src="newItem.avatar" mode="aspectFill"></image>
							</view>
							<view style="flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="font-size: 28rpx;color: #767676;" @click="openHome(newItem)">
										<text>{{newItem.role_realname}}·{{newItem.role_dynasty}}</text>
										<block v-if="newItem.p_role_realname!=undefined">
											<text style="margin: 0rpx 15rpx;">回复</text>
											<text>{{newItem.p_role_realname}}·{{newItem.p_role_dynasty}}</text>
										</block>
									</view>
									<image v-if="newItem.p_role_realname==undefined"
										style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" :src="newItem.mw_image">
									</image>
								</view>
								<view
									style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
									<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 50rpx;"
										hover-class="hoverClass"
										:style="{background:replyData.id==newItem.id?'#eee':''}"
										@longpress="operate(newItem,'2',index)">
										{{newItem.poetry}}
									</view>
									<view style="display: flex;align-items: center;">
										<block v-if="newItem.is_zan == 0">
											<view @click="zan(newItem,index,3)" class="ri-heart-line"
												style="font-size: 35rpx;color: #C7C7C7;margin-right: 8rpx;">
											</view>
										</block>
										<block v-else>
											<text @click="zan(newItem,index,3)" class="ri-heart-fill"
												style="font-size: 35rpx;color: #FE4373;margin-right: 8rpx;"></text>
										</block>
										<text v-if="newItem.diggnums!=0"
											style="font-size: 28rpx;color: #808080;">{{newItem.diggnums}}</text>
									</view>
								</view>
								<view style="margin-top: 20rpx;color: #767676;font-size: 28rpx;">
									<text>{{newItem.createtime}}</text>
									<text style="margin:0rpx 56rpx;" @click="newComment(newItem)">回复</text>
								</view>
							</view>
						</view>
					</block>
					<view v-if="item.children_count > 0" @click="clickMort(item,index)"
						style="color: #FE4373;margin-top: 20rpx;font-size: 28rpx;">
						展开{{ item.children_count}}条回复 <text class="ri-arrow-down-s-line"
							style="font-size: 30rpx;"></text>
					</view>
				</view>
			</view>
		</view>
		<feiGift ref="feiGift" channel="2"></feiGift>
		<feiOperate ref="feiOperate" :showReport="showReport" :showDeleteComment='showDeleteComment' @close='popupClose'
			@deleteComment="deleteComment" @tread='tread' @report='report' :showCai="showCai"></feiOperate>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	import feiGift from "@/components/fei-gift/fei-gift.vue"
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	export default {
		components: {
			feiOperate,
			feiGift
		},
		data() {
			return {
				platform: uni.getSystemInfoSync().platform,
				centerText: [],
				lists: [],
				message: '',
				inputFocus: false,
				showCommentBar: false,
				placeholder: "",
				pageHeight: 0,
				emojiList: [],
				showEmoji: false,
				replyUserData: [],
				moreFlag: false,
				showDeleteComment: false,
				replyData: [],
				replyIndex: null,
				showReport: false,
				userInfo: uni.getStorageSync("userInfo"),
				page: 1,
				showCai: false,
			}
		},
		onReachBottom() {
			this.page++;
			this.getList()
		},
		onLoad(item) {
			this.getCenterText()
			this.watchKeyboard();
			this.getEmojiList();
			this.setFontFamily()
		},
		methods: {
			blur() {
				this.replyData = [];
				this.replyIndex = null;
				this.showCommentBar = false;
			},
			showGift(item) {
				this.$refs.feiGift.show();
				this.$refs.feiGift.setThird_id(item.id);
				this.$refs.feiGift.setId(item.user_id);
			},
			//点击表情
			handleEmojiSend(item) {
				let that = this
				that.message += item
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
			openHome(item) {
				var that = this;
				that.$u.route('/pages/user/home', {
					user_id: item.user_id
				})
			},
			report() {
				var that = this;
				that.$u.route('/pages/public/report', {
					user_id: that.replyData.user_id,
					type: '诗令评论',
					selectId: that.replyData.id
				})
				that.replyData = [];
				that.replyIndex = null;
			},
			tread() {
				var that = this;
				that.$api("poetry.cai", {
					id: that.replyData.id
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: "none",
					})
					that.replyData = [];
					that.replyIndex = null;
				})
			},
			popupClose() {
				this.replyData = [];
				this.replyIndex = null;
			},
			deleteComment() {
				var that = this;
				that.$api("poetry.delComment", {
					id: that.replyData.id
				}).then(res => {
					if (res.code == 1) {
						switch (that.replyData.cate) {
							case "1":
								that.lists[that.replyIndex].replyList.forEach((val, index) => {
									if (val.id == that.replyData.id) {
										that.lists[that.replyIndex].replyList.splice(index, 1);
										that.$forceUpdate()
									}
								})
								break;
							case "2":
								that.lists[that.replyIndex].newList.forEach((val, index) => {
									if (val.id == that.replyData.id) {
										that.lists[that.replyIndex].newList.splice(index, 1);
										that.$forceUpdate()
									}
								})
								break;
						}
						that.replyData = [];
						that.replyIndex = null;
					}
				})
			},
			operate(item, cate, index) {
				console.log("fei")
				var userInfo = uni.getStorageSync("userInfo");
				this.replyData = item;
				this.replyIndex = index;
				this.replyData.cate = cate;
				if (userInfo.id == item.user_id) {
					if (cate == 0) {
						this.showDeleteComment = true;
						this.replyData = []
						this.replyIndex = null;
						this.showCai = false;
					} else {
						this.showDeleteComment = true;
						this.showReport = false;
						this.showCai = false;
						this.$refs.feiOperate.show()
					}
				} else {
					this.showReport = true;
					this.showCai = true;
					this.showDeleteComment = false;
				}
				this.$refs.feiOperate.show()
			},
			zan(item, index, cate) {
				var that = this;
				that.$api("poetry.poetryZan", {
					id: item.id
				}).then(res => {
					console.log(res)
					switch (cate) {
						case 1:
							that.lists[index].is_zan = !that.lists[index].is_zan;
							that.lists[index].diggnums = that.lists[index].is_zan ? ++that.lists[index].diggnums :
								--that.lists[index].diggnums;
							that.$forceUpdate()
							break;
						case 2:
							that.lists[index].replyList.forEach((val, index1) => {
								if (val.id == item.id) {
									console.log(that.lists[index].replyList[index1])
									that.lists[index].replyList[index1].is_zan = !that.lists[index]
										.replyList[index1].is_zan;
									that.lists[index].replyList[index1].diggnums = that.lists[index]
										.replyList[index1].is_zan ? ++that.lists[index].replyList[index1]
										.diggnums : --that.lists[index].replyList[index1].diggnums;
									that.$forceUpdate()
								}
							})
							break;
						case 3:
							that.lists[index].newList.forEach((val, index1) => {
								if (val.id == item.id) {
									that.lists[index].newList[index1].is_zan = !that.lists[index]
										.newList[index1].is_zan;
									that.lists[index].newList[index1].diggnums = that.lists[index]
										.newList[index1].is_zan ? ++that.lists[index].newList[index1]
										.diggnums : --that.lists[index].newList[index1].diggnums;
									that.$forceUpdate()
								}
							})
							break;
					}
				})
			},
			replyComment(item) {
				var that = this;
				this.replyUserData = item;
				this.showCommentBar = true;
				this.inputFocus = true;
				this.message = '';
				this.replyData = {
					pid: item.id,
					top_poetry_id: item.top_poetry_id,
				}
				that.placeholder = `回复${item.role_realname}·${item.role_dynasty}`
			},
			clickMort(item, index) {
				let that = this;
				that.$api("poetry.reply_poetry_list", {
					page: item.replyPage,
					limit: 10,
					poetry_word_id: that.centerText.id,
					top_poetry_id: item.id
				}).then(res => {
					if (res.code == 1) {
						that.lists[index].newList = []
						that.lists[index].replyList.push(...res.data);
						that.lists[index].children_count = that.lists[index].children_count -
							res.data.length;
						that.lists[index].replyPage++;
						that.moreFlag = true;
						that.$forceUpdate()
					}
				})
			},
			newComment(item) {
				var that = this;
				this.replyUserData = item;
				this.showCommentBar = true;
				this.inputFocus = true;
				this.message = "";
				this.replyData = {
					pid: item.id,
					top_poetry_id: item.top_poetry_id,
				}
				that.placeholder = `回复${item.role_realname}·${item.role_dynasty}`
			},
			submit() {
				var that = this;
				if (that.message == '') {
					uni.showToast({
						icon: "none",
						title: "请输入诗句"
					})
					return;
				}
				if (that.flag) {
					return;
				}
				that.flag = true;
				if (this.replyData.pid == 0) {
					that.replyData.poetry = that.message;
					that.replyData.poetry_word_id = that.centerText.id;
					that.$api("poetry.add_poetry_ling", that.replyData).then(res => {
						that.flag = false;
						if (res.code == 1) {
							that.lists = [];
							that.page = 1;
							that.getList()
						}
						that.showCommentBar = false;
						that.inputFocus = false;
						that.message = ''
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					})
				} else {
					that.replyData.poetry = that.message;
					that.replyData.poetry_word_id = that.centerText.id;
					console.log(that.replyData)
					that.$api("poetry.reply_poetry_ling", that.replyData).then(res => {
						that.flag = false;
						if (res.code == 1) {
							that.lists.forEach((val, index) => {
								if (val.id == res.data.top_poetry_id) {
									var userInfo = uni.getStorageSync("userInfo");
									var newData = res.data;
									if (val.replyList.length != 0) {
										newData.role_dynasty = userInfo.dynasty;
										newData.role_realname = userInfo.realname;
										newData.avatar = userInfo.avatar;
										newData.is_zan = 0;
										if (that.replyUserData.length != 0) {
											newData.p_role_realname = that.replyUserData.role_realname;
											newData.p_role_dynasty = that.replyUserData.role_dynasty;
										}
										val.replyList.push(newData)
									} else {
										newData.role_dynasty = userInfo.dynasty;
										newData.role_realname = userInfo.realname;
										newData.avatar = userInfo.avatar;
										newData.is_zan = 0;
										if (that.replyUserData.length != 0) {
											newData.p_role_realname = that.replyUserData.role_realname;
											newData.p_role_dynasty = that.replyUserData.role_dynasty;
										}
										val.newList.push(newData);
									}
									that.$forceUpdate()
								}
							})
						}
						that.inputFocus = false,
							that.showCommentBar = false,
							that.message = '';
						that.showEmoji = false;
					})
				}
			},
			addPoem() {
				this.watchKeyboard();
				this.replyUserData = [];
				this.showCommentBar = true;
				this.inputFocus = true;
				this.showEmoji = false;
				this.message = '';
				this.replyData = {
					poetry_word_id: this.centerText.id,
					pid: 0,
					top_poetry_id: 0,
				}
				this.placeholder = `含有【${this.centerText.word}】字的诗句`
			},
			addComment(item) {
				var that = this;
				this.replyUserData = [];
				this.watchKeyboard();
				this.showCommentBar = true;
				this.inputFocus = true;
				this.message = '';
				this.replyData = {
					pid: item.id,
					top_poetry_id: item.id,
				}
				that.placeholder = `回复${item.realname}·${item.dynasty}`
			},
			getList() {
				var that = this;
				that.$api("poetry.lists", {
					poetry_word_id: that.centerText.id,
					page: that.page,
					limit: 10,
					cate: 2
				}).then((res) => {
					if (res.code == 1) {
						that.lists.push(...res.data);
						that.lists.forEach((val, index) => {
							val.replyPage = 1;
							val.replyList = [];
							val.newList = [];
						})
					} else {
						that.loadmoreText = res.msg
					}
				})
			},
			getCenterText() {
				var that = this;
				that.$api("poetry.everyday_poetry_title").then(res => {
					if (res.code == 1) {
						that.centerText = res.data;
						that.page = 1;
						that.getList()
					}
				})
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
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/regular.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss" scoped>
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
		background: #fff;
	}
</style>