<template>
	<view>
		<u-popup :show="showAction" @close="closePopup" :closeable="false" :round="30">
			<view style="padding: 50rpx 55rpx;">
				<view class="delete" v-if="showDeleteComment" @click="delComment" style="margin-bottom: 36rpx;">
					<view style="font-size: 30rpx;">删除评论</view>
				</view>
				<view class="delete" style="margin-bottom: 36rpx;" @click="cai" v-if="!showDeleteComment">
					<view style="font-size: 30rpx;">不喜欢/点踩</view>
				</view>
				<view class="delete" v-if="!showDeleteComment" @click="jubao" style="margin-bottom: 36rpx;">
					<view style="font-size: 30rpx;">举报广告/色情等</view>
				</view>
				<view class="delete2" @click="close" style="margin-top: 36rpx;">
					<view style="font-size: 30rpx;">取消</view>
				</view>
			</view>
		</u-popup>
		<block v-for="(item,index) in listPostComment">
			<view class="commentItem" style="margin-top: 30rpx;display: flex;" v-if="item.status != 'hidden'">
				<u-avatar size="85" :src="item.avatar" mode="aspectFill"
					@click="openHome(item)"></u-avatar>
				<view style="flex: 1;margin-left: 16rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;height: 65rpx;">
						<view style="color: #767676;font-size: 28rpx;display: flex;align-items: center;">
							<text @click="openHome(item)">{{ item.role_realname}}·{{item.role_dynasty}}</text>
							<image :src="item.mw_image" style="width: 32rpx;height: 32rpx;margin-left: 20rpx;" mode="">
							</image>
						</view>
						<view style="display: flex;" @click="handlePostDigComment(item)">
							<text v-show='item.is_zan==0' class="ri-heart-line"
								style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
							<text v-show='item.is_zan==1' class="ri-heart-fill"
								style="font-size: 32rpx;margin-right: 10rpx;color: #fe4373;"></text>
							<text <text
								style="font-size: 22rpx;color: #999;">{{ item.diggnums==0?'':item.diggnums }}</text>
						</view>
					</view>
					<view class="commentItemContent">
						<view style="color: #323232;font-size: 32rpx;" hover-class="hoverClass"
							@longpress="operate(item,'1',index)"
							:style="{background:operateData.id==item.id?'#eee':''}">{{ item.content }}</view>
						<view style="margin-top: 15rpx;">
							<text
								style="color: #767676;font-size: 28rpx;margin-right: 10rpx;">{{item.createtime==undefined?'刚刚':item.createtime}}</text>
							<text style="color: #808080;font-size: 28rpx;" @click="reply(item)">回复</text>
						</view>
						<!-- 更多 -->
						<view v-if="item.moreData != undefined">
							<block v-for="(sonItem,sonindex) in item.moreData">
								<view style="display: flex;margin-top: 20rpx;">
									<image :src="sonItem.avatar" @click="openHome(sonItem)"
										style="width: 50rpx;height: 50rpx;border-radius: 50%;margin-right: 10rpx;"
										mode="aspectFill">
									</image>
									<view style="width: calc(100% - 50rpx - 10rpx);color: #767676;">
										<view style="display: flex;align-items: center;">
											<text
												@click="openHome(sonItem)">{{sonItem.role_realname}}·{{sonItem.role_dynasty}}
												<text v-if="sonItem.p_role_realname!=undefined"><text
														style="color: #777;margin: 0rpx 10rpx;">回复</text>{{sonItem.p_role_realname}}·{{sonItem.p_role_dynasty}}</text>
											</text>
											<image v-if="sonItem.p_role_realname==undefined" :src="sonItem.mw_image"
												style="width: 32rpx;height: 32rpx;margin-left: 20rpx;" mode="">
											</image>
										</view>
										<view style="margin-top: 10rpx;font-size: 32rpx;color:#323232;"
											hover-class="hoverClass"
											:style="{background:operateData.id==sonItem.id?'#eee':''}"
											@longpress="operate(sonItem,'2',index)">
											{{sonItem.content}}
										</view>
										<view
											style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 15rpx;">
											<view>
												<text
													style="color: #767676;font-size: 28rpx;margin-right: 10rpx;">{{sonItem.createdate}}</text>
												<text style="color: #808080;font-size: 28rpx;"
													@click="reply2(sonItem)">回复</text>
											</view>
											<view @click="handlePostDigComment(sonItem)">
												<text v-show='sonItem.is_zan==0' class="ri-heart-line"
													style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
												<text v-show='sonItem.is_zan==1' class="ri-heart-fill"
													style="font-size: 32rpx;margin-right: 10rpx;color: #fe4373;"></text>
												<text <text
													style="font-size: 22rpx;color: #999;">{{sonItem.diggnums==0?'':sonItem.diggnums}}</text>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<!-- xin -->
						<view v-if="item.newList != undefined">
							<block v-for="(sonItem,sonindex) in item.newList">
								<view style="display: flex;margin-top: 10rpx;">
									<image @click="openHome(sonItem)" :src="sonItem.avatar"
										style="width: 50rpx;height: 50rpx;border-radius: 50%;margin-right: 10rpx;"
										mode="aspectFill">
									</image>
									<view style="width: calc(100% - 50rpx - 10rpx);">
										<view style="display: flex;align-items: center;">
											<text
												@click="openHome(sonItem)">{{sonItem.role_realname}}·{{sonItem.role_dynasty}}
												<text v-if="sonItem.p_role_realname!=undefined"> <text
														style="color: #777;margin: 0rpx 10rpx;">回复</text>
													{{sonItem.p_role_realname}}·{{sonItem.p_role_dynasty}}</text>
											</text>
											<image v-if="sonItem.p_role_realname==undefined" :src="sonItem.mw_image"
												style="width: 32rpx;height: 32rpx;margin-left: 20rpx;" mode="">
											</image>
										</view>
										<view style="margin-top: 10rpx;font-size: 32rpx;color:#323232;"
											hover-class="hoverClass"
											:style="{background:operateData.id==sonItem.id?'#eee':''}"
											@longpress="operate(sonItem,'3',index)">
											{{sonItem.content}}
										</view>
										<view
											style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 15rpx;">
											<view>
												<text
													style="color: #767676;font-size: 28rpx;margin-right: 10rpx;">{{sonItem.createdate}}</text>
												<text style="color: #808080;font-size: 28rpx;"
													@click="reply2(sonItem)">回复</text>
											</view>
											<view @click="handlePostDigComment(sonItem)">
												<text v-show='sonItem.is_zan==0' class="ri-heart-line"
													style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
												<text v-show='sonItem.is_zan==1' class="ri-heart-fill"
													style="font-size: 32rpx;margin-right: 10rpx;color: #fe4373;"></text>
												<text <text
													style="font-size: 22rpx;color: #999;">{{sonItem.diggnums==0?'':sonItem.diggnums}}</text>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view v-if="item.children_count > 0" style="color: #FE4373;margin-top: 5rpx;"
							@click="clickMort(item,index)">
							~~~ 展开{{ item.children_count}}条回复 <text class="ri-arrow-down-s-line"
								style="font-size: 30rpx;"></text>
						</view>
					</view>
				</view>
			</view>
		</block>
		<u-empty v-if="!listPostComment.length" icon="/static/wupinglun.png" text="暂无评论" textColor="#a1a1a1"
			marginTop="100"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id1: null,
				is_commentZan: 0,
				comment_diggnums: null,
				post_id: null,
				name: "",
				page: 1,
				num: 0,
				userInfo: [],
				listPostComment: [],
				onePage: 1,
				showAction: false,
				showDeleteComment: false,
				operateData: [],
				operateIndex: null
			}
		},
		created() {
			this.getPostComment()
		},
		methods: {
			openHome(item) {
				var that = this;
				that.$u.route('/pages/user/home', {
					user_id: item.user_id
				})
			},
			closePopup() {
				this.showAction = false
				this.operateData = [];
				this.showAction = false;
				this.operateIndex = null;
			},
			close() {
				this.showAction = false
				this.operateData = [];
				this.showAction = false;
				this.operateIndex = null;
			},
			jubao() {
				this.$u.route('/pages/public/report', {
					user_id: this.operateData.user_id,
					type: '动态评论',
					selectId: this.operateData.id
				})
				this.showAction = false
				this.operateData = [];
				this.showAction = false;
				this.operateIndex = null;
			},
			cai() {
				var that = this;
				that.$api("comment.cai", {
					id: that.operateData.id
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
					this.showAction = false
					this.operateData = [];
					this.showAction = false;
					this.operateIndex = null;
				})
			},
			delComment() {
				var that = this;
				that.$api("comment.del", {
					id: that.operateData.id
				}).then(res => {
					if (res.code == 1) {
						if (that.operateData.cate == "1") {
							that.listPostComment.forEach((val, index1) => {
								if (val.id == that.operateData.id) {
									that.listPostComment.splice(index1, 1)
								}
							})
						} else if (that.operateData.cate == "2") {
							that.listPostComment[that.operateIndex].moreData.forEach((val, index1) => {
								if (val.id == that.operateData.id) {
									that.listPostComment[that.operateIndex].moreData.splice(index1, 1)
								}
							})
						} else if (that.operateData.cate == "3") {
							that.listPostComment[that.operateIndex].newList.forEach((val, index1) => {
								if (val.id == that.operateData.id) {
									that.listPostComment[that.operateIndex].newList.splice(index1, 1)
								}
							})
						}
					}
					that.operateData = [];
					that.showAction = false;
					that.operateIndex = null;
				})
			},
			operate(item, cate, index) {
				var userInfo = uni.getStorageSync("userInfo");
				if (item.user_id == userInfo.id) {
					this.showDeleteComment = true;
				} else {
					this.showDeleteComment = false;
				}
				this.operateData = item;
				this.operateIndex = index;
				this.operateData.cate = cate;
				this.showAction = true;
			},
			scrollBottom() {
				this.onePage++;
				this.getPostComment()
			},
			pinglun2(data, msg, nullFlag) {
				var that = this;
				var currentIndex = null;
				var obj = {}
				that.listPostComment.forEach((val, index) => {
					if (val.id == data.top_post_comment_id) {
						currentIndex = index;
						var userInfo = uni.getStorageSync("userInfo");
						obj = {
							avatar: userInfo.avatar,
							content: data.content,
							is_zan: 0,
							createdate: that.$u.timeFormat(data.createtime, 'yyyy-mm-dd hh:MM'),
							id: data.id,
							status: "normal",
							children_count: 0,
							role_dynasty: userInfo.dynasty,
							role_realname: userInfo.realname,
							diggnums: 0,
							post_comment_id: data.post_comment_id,
							top_post_comment_id: data.top_post_comment_id,
							post_id: data.post_id,
							p_role_realname: nullFlag.role_realname,
							p_role_dynasty: nullFlag.role_dynasty,
							user_id: userInfo.id
						}
					}
				})
				if (that.listPostComment[currentIndex].moreData == undefined) {
					if (that.listPostComment[currentIndex].newList == undefined) {
						that.listPostComment[currentIndex].newList = [];
						that.listPostComment[currentIndex].newList.push(obj);
					} else {
						that.listPostComment[currentIndex].newList.push(obj);
					}
				} else {
					that.listPostComment[currentIndex].moreData.push(obj);
				}
				that.$forceUpdate()
			},
			pinglun1(data, msg, nullFlag) {
				var that = this;
				var currentIndex = null;
				var obj = {}
				that.listPostComment.forEach((val, index) => {
					if (val.id == data.top_post_comment_id) {
						currentIndex = index;
						var userInfo = uni.getStorageSync("userInfo");
						obj = {
							avatar: userInfo.avatar,
							content: data.content,
							is_zan: 0,
							createdate: that.$u.timeFormat(data.createtime, 'yyyy-mm-dd hh:MM'),
							id: data.id,
							status: "normal",
							children_count: 0,
							role_dynasty: userInfo.dynasty,
							role_realname: userInfo.realname,
							diggnums: 0,
							post_comment_id: data.post_comment_id,
							top_post_comment_id: data.post_comment_id,
							post_id: data.post_id,
							user_id: userInfo.id,
							mw_image: userInfo.mw_image
						}
					}
				})
				if (that.listPostComment[currentIndex].moreData == undefined) {
					if (that.listPostComment[currentIndex].newList == undefined) {
						that.listPostComment[currentIndex].newList = [];
						that.listPostComment[currentIndex].newList.push(obj);
					} else {
						that.listPostComment[currentIndex].newList.push(obj);
					}
				} else {
					that.listPostComment[currentIndex].moreData.push(obj);
				}
				that.$forceUpdate()
			},
			pinglun0(data, msg, nullFlag) {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				var obj = {
					avatar: userInfo.avatar,
					content: data.content,
					is_zan: 0,
					createdate: that.$u.timeFormat(data.createtime, 'yyyy-mm-dd hh:MM'),
					id: data.id,
					status: "normal",
					children_count: 0,
					role_dynasty: userInfo.dynasty,
					role_realname: userInfo.realname,
					diggnums: 0,
					post_comment_id: data.post_comment_id,
					post_id: data.post_id,
					user_id: data.user_id,
					mw_image: userInfo.mw_image
				}
				that.listPostComment.push(obj)
			},
			getPostComment() {
				var that = this;
				that.$api('comment.lists', {
					post_id: that.$Route.query.post_id,
					page: that.onePage,
					limit: 10
				}).then(res => {
					if (res.code === 1) {
						that.listPostComment = [...that.listPostComment, ...res.data];
					}
				})
			},
			clickMort(item, index) {
				var that = this;
				if (item.moreData == undefined) {
					that.page = 1;
				} else {
					that.page++
				}
				that.$api("comment.listsMore", {
					page: that.page,
					limit: 10,
					top_post_comment_id: item.id,
					post_id: item.post_id
				}).then(res => {
					if (res.code == 1) {
						if (that.listPostComment[index].newList != undefined) {
							that.listPostComment[index].newList = []
						}
						if (that.listPostComment[index].moreData != undefined) {
							that.listPostComment[index].moreData = [...that.listPostComment[index].moreData, ...res
								.data
							];
						} else {
							that.listPostComment[index].moreData = [...res.data];
						}
						console.log(that.listPostComment[index])
						that.listPostComment[index].children_count = that.listPostComment[index].children_count -
							res.data.length;
						that.$forceUpdate()
					}
				})
			},
			reply(item) {
				this.$emit("reply", item)
			},
			reply2(item) {
				this.$emit("reply2", item)
			},
			// 点赞评论
			handlePostDigComment(items) {
				let that = this
				that.$api('post_comment.dig', {
					id: items.id
				}).then(res => {
					if (res.code === 1) {
						that.$u.toast('点赞成功')
						// that.isDigComment();
						items.is_zan = items.is_zan == 0 ? 1 : 0;
						items.diggnums = items.is_zan == 0 ? items.diggnums - 1 : items.diggnums + 1;
						if (that.moreData != undefined) {
							that.moreData.forEach((val, index) => {
								if (val.id == items.id) {
									if (val.is_zan == 0) {
										val.is_zan = 1
									} else {
										val.is_zan = 0
									}
								}
							})
						}
						that.$forceUpdate()
					} else {
						that.$u.toast(res.msg)
					}
				})

			},
			isDigComment() {
				let that = this
				that.$api('post_comment.lists', {
					post_id: that.id
				}).then(res => {
					if (res.code === 1) {
						let reslist = res.data
						for (let i = 0; i < reslist.length; i++) {
							if (reslist[i].id === that.item.id) {
								that.item.is_zan = reslist[i].is_zan
								that.item.diggnums = reslist[i].diggnums
							}
						}
					} else {
						that.$u.toast(res.msg)
					}
				})
			}

		}
	}
</script>

<style>
	.hoverClass {
		background: #fff;
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
</style>