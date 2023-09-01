<template>
	<view>
		<block v-for="(item,index) in listPostComment">
			<view class="commentItem" style="margin-top: 30rpx;display: flex;" v-if="item.status != 'hidden'">
				<u-avatar size="85" :src="item.avatar || '/static/avatar.png'" mode="aspectFill"
					@click="$u.route('/pages/user/home', { user_id: item.user_id })"></u-avatar>
				<view style="flex: 1;margin-left: 16rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;height: 65rpx;">
						<view style="color: #323232;font-size: 24rpx;">
							{{ item.role_realname}}·{{item.role_dynasty}}
						</view>
						<view style="display: flex;" @click="handlePostDigComment(item)">
							<text v-show='item.is_zan==0' class="ri-heart-line"
								style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
							<text v-show='item.is_zan==1' class="ri-heart-fill"
								style="font-size: 32rpx;margin-right: 10rpx;color: #fe4373;"></text>
							<text <text style="font-size: 22rpx;color: #999;">{{ item.diggnums }}</text>
						</view>
					</view>
					<view class="commentItemContent">
						<view style="color: #323232;font-size: 28rpx;">{{ item.content }}</view>
						<view>
							<text style="color: #999;font-size: 22rpx;margin-right: 10rpx;">{{item.createdate}}</text>
							<text style="color: #808080;font-size: 22rpx;" @click="reply(item)">回复</text>
						</view>
						<!-- xin -->
						<view v-if="item.newList != undefined">
							<block v-for="(sonItem,index) in item.newList">
								<view style="display: flex;margin-top: 10rpx;">
									<image :src="sonItem.avatar" 
										style="width: 50rpx;height: 50rpx;border-radius: 50%;margin-right: 10rpx;"
										mode="aspectFill">
									</image>
									<view style="width: calc(100% - 50rpx - 10rpx);">
										<view>
											<text>{{sonItem.role_realname}}·{{sonItem.role_dynasty}} <text
													v-if="sonItem.p_role_realname!=undefined"> <text
														style="color: #777;margin: 0rpx 10rpx;">回复</text>
													{{sonItem.p_role_realname}}·{{sonItem.p_role_dynasty}}</text>
											</text>
										</view>
										<view style="margin-top: 10rpx;">
											{{sonItem.content}}
										</view>
										<view
											style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
											<view>
												<text
													style="color: #999;font-size: 22rpx;margin-right: 10rpx;">{{sonItem.createdate}}</text>
												<text style="color: #808080;font-size: 22rpx;"
													@click="reply2(sonItem)">回复</text>
											</view>
											<view @click="handlePostDigComment(sonItem)">
												<text v-show='sonItem.is_zan==0' class="ri-heart-line"
													style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
												<text v-show='sonItem.is_zan==1' class="ri-heart-fill"
													style="font-size: 32rpx;margin-right: 10rpx;color: #fe4373;"></text>
												<text <text
													style="font-size: 22rpx;color: #999;">{{sonItem.diggnums}}</text>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<!-- 更多 -->
						<view v-if="item.moreData != undefined">
							<block v-for="(sonItem,index) in item.moreData">
								<view style="display: flex;margin-top: 10rpx;">
									<image :src="sonItem.avatar"
										style="width: 50rpx;height: 50rpx;border-radius: 50%;margin-right: 10rpx;"
										mode="aspectFill">
									</image>
									<view style="width: calc(100% - 50rpx - 10rpx);">
										<view>
											<text>{{sonItem.role_realname}}·{{sonItem.role_dynasty}} <text
													v-if="sonItem.p_role_realname!=undefined"><text
														style="color: #777;margin: 0rpx 10rpx;">回复</text>{{sonItem.p_role_realname}}·{{sonItem.p_role_dynasty}}</text>
											</text>
										</view>
										<view style="margin-top: 10rpx;">
											{{sonItem.content}}
										</view>
										<view
											style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
											<view>
												<text
													style="color: #999;font-size: 22rpx;margin-right: 10rpx;">{{sonItem.createdate}}</text>
												<text style="color: #808080;font-size: 22rpx;"
													@click="reply2(sonItem)">回复</text>
											</view>
											<view @click="handlePostDigComment(sonItem)">
												<text v-show='sonItem.is_zan==0' class="ri-heart-line"
													style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
												<text v-show='sonItem.is_zan==1' class="ri-heart-fill"
													style="font-size: 32rpx;margin-right: 10rpx;color: #fe4373;"></text>
												<text <text
													style="font-size: 22rpx;color: #999;">{{sonItem.diggnums}}</text>
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
				onePage: 1
			}
		},
		created() {
			this.getPostComment()
		},
		methods: {
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
						}
					}
				})
				if (that.listPostComment[currentIndex].moreData == undefined) {
					if (that.listPostComment[currentIndex].newList == undefined) {
						that.listPostComment[currentIndex].newList = [];
						that.listPostComment[currentIndex].newList.unshift(obj);
					} else {
						that.listPostComment[currentIndex].newList.unshift(obj);
					}
				} else {
					that.listPostComment[currentIndex].moreData.unshift(obj);
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
							post_id: data.post_id
						}
					}
				})
				if (that.listPostComment[currentIndex].moreData == undefined) {
					if (that.listPostComment[currentIndex].newList == undefined) {
						that.listPostComment[currentIndex].newList = [];
						that.listPostComment[currentIndex].newList.unshift(obj);
					} else {
						that.listPostComment[currentIndex].newList.unshift(obj);
					}
				} else {
					that.listPostComment[currentIndex].moreData.unshift(obj);
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
					post_id: data.post_id
				}
				that.listPostComment.unshift(obj)
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
						if(that.listPostComment[index].moreData != undefined){
							that.listPostComment[index].moreData = [...that.listPostComment[index].moreData,...res.data];
						}else{
							that.listPostComment[index].moreData = [...res.data];
						}
						
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

</style>