<template>
	<view class="wineContent">
		<u-navbar title="诗词结缘" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
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
					<text class="leading-none" style="font-size: 1.8rem;">{{ item }}</text>
				</view>
			</view>
			<view :style="{height:pageHeight+'px'}"></view>
		</view>
		<view class="content">
			<view class="headTop">
				<view class="contentTop">
					<view style="font-size: 32rpx;color: #323232;">今日诗情：</view>
					<view style="font-size: 24rpx;color: #3D3D3D;opacity: 0.7;">
						<view>{{ $u.timeFormat(detailsData.createtime, 'yyyy年mm月dd日')}}</view>
						<view>{{lunar.gzYear}} {{lunar.Animal}}</view>
						<view>{{lunar.gzMonth}}月 {{lunar.gzDay}}日</view>
					</view>
				</view>
				<view class="contentCenter">
					<view class="centerText">{{detailsData.word}}</view>
					<view class="centerSubText">{{detailsData.poetry}}</view>
				</view>
				<view style="display: flex;align-items: flex-end;flex-wrap: wrap;margin-top: 30rpx;"
					v-if="zanCount != 0">
					<view style="display: flex;align-items: center;margin-top: 10rpx;" v-for="(item,index) in zanArr"
						:key="index">
						<image mode="aspectFill" :src="item.avatar"
							style="width: 45rpx;height: 45rpx;border-radius: 50%;">
						</image>
						<view style="font-size: 28rpx;color: #323232;margin:0rpx 5rpx;">{{item.role_realname}}</view>
					</view>
					<text style="font-size: 28rpx;color: #323232;height: 45rpx;line-height: 45rpx;">等<text
							style="color: #fe4373;">{{zanCount}}</text>人点赞</text>
				</view>
			</view>
			<view class="footerBottom"
				style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
				<u-tabs :list="tablist" lineColor="#FE4373" lineWidth="120rpx" lineHeight="16rpx"
					itemStyle="height: 72rpx;"
					inactiveStyle="color: #808080; transform: scale(1);font-weight:normal;transition:all 0.3s;"
					activeStyle="color: #323232 ; font-weight: blod; transform: scale(1.2);transition:all 0.3s;"
					@change="changeTab">
				</u-tabs>
				<view class="okBtn1" @click="openball">再发一次</view>
			</view>
			<!-- 列表 -->
			<view v-show="tabIndex==0" class="lists"
				style="padding: 0rpx 36rpx;box-sizing: border-box;margin-top: 43rpx;">
				<view v-if="!lists.length">
					<u-empty icon="/static/null.png" text=" " textColor="#a1a1a1" marginTop="100"></u-empty>
					<view v-html="loadmoreText" style="text-align: center;font-size: 20rpx;color: #999;"></view>
				</view>

				<view v-else class="listItem" v-for="(item,index) in lists" :key="index">
					<view style="width: 96rpx;height: 96rpx;border-radius: 50%;overflow: hidden;margin-right: 26rpx;">
						<image @click="openHome(item)" style="width: 100%;height: 100%;" :src="item.avatar"
							mode="aspectFill">
						</image>
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
							<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 20rpx;"
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
						<view
							style="margin-top: 20rpx;color: #767676;font-size: 28rpx;display: flex;align-items: center;">
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
							<view style="display: flex;margin-top: 23rpx;"
								v-for="(replyItem,replyIndex) in item.replyList" :key="replyItem.id">
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
										<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 20rpx;"
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
											style="width: 32rpx;height: 32rpx;margin-left: 11rpx;"
											:src="newItem.mw_image">
										</image>
									</view>
									<view
										style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
										<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 20rpx;"
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
			<!-- 评论 -->
			<view v-show="tabIndex == 1" class="lists" style="box-sizing: border-box;">
				<u-empty v-if="!lists.length" icon="/static/null.png" text="暂无内容" textColor="#a1a1a1"
					marginTop="100"></u-empty>
				<view v-else class="listItem" style="border: none !important;margin-bottom: 0rpx;"
					v-for="(item,index) in lists" :key="index">
					<view style="width: 65rpx;height: 65rpx;border-radius: 50%;overflow: hidden;margin-right: 26rpx;">
						<image @click="openHome(item)" style="width: 100%;height: 100%;" :src="item.avatar"
							mode="aspectFill">
						</image>
					</view>
					<view style="flex: 1;">
						<view style="display: flex;align-items: center;">
							<view style="font-size: 28rpx;color: #767676;" @click="openHome(item)">
								{{item.realname||item.role_realname}}·{{item.dynasty||item.role_dynasty}}
								<block v-if="item.p_role_realname!=undefined">
									<text style="margin: 0rpx 15rpx;">回复</text>
									<text>{{item.p_role_realname}}·{{item.p_role_dynasty}}</text>
								</block>
							</view>
							<image v-if="item.p_role_realname==undefined"
								style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" :src="item.mw_image"></image>
						</view>
						<view
							style="width: 100%;display: flex;align-items: center;justify-content: space-between;margin-top: 13rpx;">
							<view style="font-size: 32rpx;color: #3D3D3D;flex: 1;margin-right: 20rpx;"
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
						<view
							style="margin-top: 20rpx;color: #767676;font-size: 28rpx;display: flex;align-items: center;">
							<text>{{item.createtime}}</text>
							<text style="color: #808080;margin-left: 22rpx;" @click="commentreply(item)">回复</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<topPrompt></topPrompt>
		<feiGift ref="feiGift" channel="2"></feiGift>
		<feiOperate ref="feiOperate" :showReport="showReport" :showDeleteComment='showDeleteComment' @close='popupClose'
			@deleteComment="deleteComment" @tread='tread' @report='report'></feiOperate>
	</view>
</template>

<script>
	import feiGift from "@/components/fei-gift/fei-gift.vue"
	import Calendar from '@/common/utils/util.js';
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	export default {
		name: "wineContent",
		components: {
			feiGift,
			feiOperate
		},
		data() {
			return {
				tablist: [{
					name: '今日诗缘',
					type: 1
				}, {
					name: '我的评论',
					type: 2
				}],
				tabIndex: 0,
				showReport: false,
				showDeleteComment: false,
				detailsData: [],
				lunar: [],
				parentData: [],
				user_id: "",
				guanzhuIndex: "",
				zanCount: 0,
				zanArr: [],
				page: 1,
				lists: [],
				replyData: [],
				replyIndex: null,
				userInfo: uni.getStorageSync("userInfo"),
				showCommentBar: false,
				message: '',
				inputFocus: false,
				placeholder: "",
				pageHeight: 0,
				emojiList: [],
				showEmoji: false,
				replyUserData: [],
				poetry_word_id: null,
				commentList: [],
				loadmoreText: '',
				selectType: 1, //1:诗源，2:评论
			}
		},
		onLoad(e) {
			if (e.data == undefined) {
				this.getDetails("");
			} else {
				var data = JSON.parse(e.data);
				this.poetry_word_id = data.poetry_word_id
				this.getDetails(data.id);
				// this.getList(data.poetry_word_id)
			}
			this.watchKeyboard();
			this.getEmojiList();
			this.setFontFamily()
		},
		onReachBottom() {
			var that = this;
			that.page++;
			if (this.tabIndex == 0) {
				that.getList(this.poetry_word_id);
			} else {
				that.getComment(this.data.poetry_data.id)
			}
		},
		methods: {
			commentreply(item) {
				var that = this;
				this.showCommentBar = true;
				this.inputFocus = true;
				this.message = "";
				this.replyData = {
					pid: item.id,
					top_poetry_id: item.id,
				}
				that.placeholder = `回复${item.realname||item.role_realname}·${item.dynasty||item.role_dynasty}`
			},
			getComment(id) {
				var that = this;
				that.$api("poetry.reply_poetry_list", {
					page: that.page,
					limit: 10,
					cate: 1,
					top_poetry_id: id
				}).then(res => {
					if (res.code == 1) {
						if (that.page == 1) {
							that.lists = res.data == null ? [] : res.data;
						} else {
							var data = res.data == null ? [] : res.data;
							that.lists = [...that.lists, ...data];
						}
						that.lists.forEach((val, index) => {
							val.replyPage = 1;
							val.replyList = [];
							val.newList = [];
						})
					}
				})
			},
			//tab切换
			changeTab(e) {
				this.tabIndex = e.index;
				this.page = 1;
				this.lists = []
				if (this.tabIndex == 1) {
					this.selectType = 2;
					this.getComment(this.data.poetry_data.id)
				} else if (this.tabIndex == 0) {
					this.selectType = 1;
					this.getList(this.data.poetry_data.poetry_word_id)
				}
				console.log(this.selectType)
			},
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
				var userInfo = uni.getStorageSync("userInfo");
				this.replyData = item;
				this.replyIndex = index;
				this.replyData.cate = cate;
				if (userInfo.id == item.user_id) {
					if (cate == 0) {
						this.showDeleteComment = true;
						this.replyData = []
						this.replyIndex = null;
					} else {
						this.showDeleteComment = true;
						this.showReport = false;
						this.$refs.feiOperate.show()
					}
				} else {
					this.showReport = true;
					this.showDeleteComment = false;
				}
				this.$refs.feiOperate.show()
			},
			zan(item, index, cate) {
				var that = this;
				that.$api("poetry.poetryZan", {
					id: item.id
				}).then(res => {
					switch (cate) {
						case 1:
							that.lists[index].is_zan = that.lists[index].is_zan == 0 ? 1 : 0;
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
				this.message = ""
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
					poetry_word_id: that.poetry_word_id,
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
				this.message = '';
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
						title: "请输入内容"
					})
					return;
				}
				if (that.flag) {
					return;
				}
				that.flag = true;
				if (this.replyData.pid == 0) {
					that.replyData.poetry = that.message;
					that.replyData.poetry_word_id = that.poetry_word_id;
					that.$api("poetry.add_poetry_ling", that.replyData).then(res => {
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
					if (that.selectType == 1) {
						that.replyData.poetry = that.message;
						that.replyData.poetry_word_id = that.poetry_word_id;
					} else {
						that.replyData.top_poetry_id = that.data.poetry_data.id
						that.replyData.poetry = that.message;
						that.replyData.poetry_word_id = that.poetry_word_id;
					}
					that.$api("poetry.reply_poetry_ling", that.replyData).then(res => {
						if (res.code == 1) {
							if (that.selectType == 2) {
								that.lists = [];
								that.page = 1;
								that.getComment(that.data.poetry_data.id);
								that.inputFocus = false,
									that.showCommentBar = false,
									that.message = '';
								that.showEmoji = false;
								return;
							}
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
				that.flag = false;
			},
			addPoem() {
				this.replyUserData = [];
				this.showCommentBar = true;
				this.inputFocus = true;
				this.showEmoji = false;
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
				this.showCommentBar = true;
				this.inputFocus = true;
				this.message = "";
				this.replyData = {
					pid: item.id,
					top_poetry_id: item.id,
				}
				that.placeholder = `回复${item.realname||item.role_realname}·${item.dynasty||item.role_dynasty}`
			},
			getList(id) {
				var that = this;
				that.$api("poetry.lists", {
					poetry_word_id: id,
					page: that.page,
					limit: 10,
					cate: 1
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
			//返回泡泡页面
			openball() {
				var that = this;
				uni.redirectTo({
					url: '/pages/joy/wine'
				});
			},
			//详情
			getDetails(id) {
				var that = this;
				that.$api("poetry.details", {
					id: id
				}).then((res) => {
					if (res.code == 1) {
						that.data = res.data;
						that.poetry_word_id = res.data.poetry_data.poetry_word_id;
						that.detailsData = res.data.poetry_data;
						that.zanArr = res.data.zan_user_data;
						that.zanCount = res.data.zan_user_count;
						var date = new Date(res.data.poetry_data.createtime * 1000);
						var calendar = new Calendar();
						calendar.setDate(date)
						that.getList(res.data.poetry_data.poetry_word_id)
						that.lunar = calendar.getInfo(date).lunar;
						if (id != "") {
							that.data.my_poetry_count = 5;
						}
					}
				})
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
		margin-top: 0rpx;
	}

	.follow {
		width: 100rpx;
		height: 42rpx;
		background: #FE4373;
		font-size: 24rpx;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.followActive {
		width: 100rpx;
		height: 42rpx;
		background: #999;
		font-size: 24rpx;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.userList {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.scrollView {
		flex: 1;
		height: 0 !important;
		box-sizing: border-box;
		padding: 0rpx 30rpx 30rpx 30rpx;
	}

	.userItem {
		display: flex;
		padding: 30rpx;
		box-sizing: border-box;
	}

	page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.wineContent {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.contentTop {
		display: flex;
		justify-content: space-between;
	}

	.contentCenter {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.headTop {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.footerBottom {
		display: flex;
		flex-direction: row;
		padding-left: 10rpx;
		box-sizing: border-box;
	}

	.centerText {
		font-size: 180rpx;
		color: #323232;
		font-family: font-test;
	}

	.centerSubText {
		padding-top: 50rpx;
		font-size: 44rpx;
		color: #3D3D3D;
		font-family: font-test;
		text-align: center;
	}

	.okBtn {
		background: #FE4373;
		border-radius: 43px;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		width: 300rpx;
		margin: 45rpx auto;
	}

	.okBtn1 {
		background: #FE4373;
		border-radius: 43px;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		width: 200rpx;
		margin-right: 30rpx;
		font-size: 25rpx;
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

	.listItem {
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 1rpx solid #DABB7C;
		padding: 26rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.6);
		display: flex;
		margin-bottom: 36rpx;
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