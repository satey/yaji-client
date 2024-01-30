<template>
	<view style="background: #F8F8F8;height: 100vh;">

		<view class="hedaBar">
			<u-tabs :list="chatTablist" lineColor="#FFB96A" lineWidth="50rpx" lineHeight="6rpx"
				itemStyle="height: 80rpx;" inactiveStyle="color: #787878; transform: scale(1);font-size:32rpx"
				activeStyle="color: #333333; font-weight: bold;font-size:36rpx" @change="chatChangeTab">
			</u-tabs>
		</view>
		<view style="height: 80rpx;padding-top: var(--status-bar-height);"></view>
		<!-- 聊天 -->
		<template v-if="currentType=='chat'">
			<view class="chatContainer">
				<!-- 动态消息 -->
				<view @click="$u.route('/pages/chat/trendsMsg')">
					<view class="SystemNoticeContainer">
						<view class="notice">
							<text class="ri-notification-3-fill icon"></text>
						</view>
						<view class="noticeRight">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<text style="font-size: 30rpx;color:#323232;">通知</text>
								<text
									style="font-size: 24rpx;color:#999999;">{{ $u.timeFormat($store.state.message.messageList.notice.createtime, 'mm-dd hh:MM') }}</text>
							</view>
							<view style="color: #808080;font-size: 26rpx;"
								v-if="$store.state.message.messageList.notice.content == ''">
								暂无通知消息</view>
							<view style="display: flex;align-items: center;justify-content: space-between;"
								v-if="$store.state.message.messageList.notice.content!= ''">
								<view class="noticeContent" style="">
									{{$store.state.message.messageList.notice.content}}
								</view>
								<view v-if="$store.state.message.messageList.notice.no_read_total_count!=0"
									class="tips2">
									{{$store.state.message.messageList.notice.no_read_total_count}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 置顶消息 -->
				<view v-for="(item,index) in $store.state.message.messageList.data" :key="item.id"
					@click="openChat(item)">
					<view
						style="display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #ededed;padding: 30rpx;position: relative;background: #fff;"
						v-if="item.user_id!=undefined  && item.is_topping == 1">
						<image mode="aspectFill" class="userImg" :fade-show="true" :src="item.avatar"></image>
						<view
							style="position: absolute;top: -22rpx;left: -22rpx;transform: rotate(46deg);font-size: 50rpx;color: #EB3446;"
							class="ri-arrow-left-s-fill"></view>
						<view class="noticeRight">
							<view
								style="display: flex;align-items: center;justify-content: space-between;font-size: 30rpx;color:##333333;">
								<block v-if="item.realname!=''&&item.dynasty!=null">
									<text>{{item.realname}}·{{item.dynasty}}</text>
								</block>
								<block v-else>
									<text>无名氏</text>
								</block>
								<text
									style="font-size: 23rpx;color:#999999;">{{ $u.timeFormat(item.send_time, 'mm-dd hh:MM') }}</text>
							</view>
							<view
								style="display: flex;align-items: center;justify-content: space-between;font-size: 26rpx;color:#666666;">
								<view class="msgContent" v-if="item.chat_message_type=='text'">
									{{item.chat_message_content}}
								</view>
								<text v-if="item.chat_message_type=='image'">[图片]</text>
								<text v-if="item.chat_message_type=='audio'">[语音]</text>
								<text v-if="item.chat_message_type=='gift'">[礼物]</text>
								<text v-if="item.chat_message_type=='play'">{{item.chat_message_content}}</text>
								<text class="tips" v-if="item.no_read_count">{{item.no_read_count}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 用户消息 -->
				<block v-if="$store.state.message.messageList.length!=0">
					<view v-for="(item,index) in $store.state.message.messageList.data" :key="index"
						@click="openChat(item)">
						<view
							style="display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #ededed;padding: 30rpx;background: #fff;"
							v-if="item.user_id!=undefined && item.is_topping == 0">
							<image mode="aspectFill" class="userImg" :src="item.avatar"></image>
							<view class="noticeRight">
								<view
									style="display: flex;align-items: center;justify-content: space-between;font-size: 30rpx;color:#323232;">
									<block v-if="item.realname!=''&&item.realname!=null">
										<text>{{item.realname}}·{{item.dynasty}}</text>
									</block>
									<block v-else>
										<text>无名氏</text>
									</block>
									<text
										style="font-size: 23rpx;color:#999999;">{{ $u.timeFormat(item.send_time, 'mm-dd hh:MM') }}</text>
								</view>
								<view
									style="display: flex;align-items: center;justify-content: space-between;font-size: 26rpx;color:#666666;">
									<view class="msgContent" v-if="item.chat_message_type=='text'">
										{{item.chat_message_content}}
									</view>
									<text v-if="item.chat_message_type=='image'">[图片]</text>
									<text v-if="item.chat_message_type=='audio'">[语音]</text>
									<text v-if="item.chat_message_type=='gift'">[礼物]</text>
									<text v-if="item.chat_message_type=='play'">[房间邀请]</text>
									<text class="tips" v-if="item.no_read_count !=0">{{item.no_read_count}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				<u-empty v-else icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1" marginTop="100"></u-empty>
			</view>
		</template>
		<!-- 朋友 -->
		<template v-if="currentType=='friend'">
			<view class="friendContainer">
				<view style="display: flex;align-items: center;justify-content: space-between;padding-right: 20rpx;">
					<u-tabs :list="tablist" lineColor="rgba(0,0,0,0)" lineWidth="70rpx" lineHeight="16rpx"
						itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);"
						activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab"
						@click="click">
					</u-tabs>
					<view class="ri-user-unfollow-line" style="color: #000;font-size: 35rpx;"
						@click="$u.route('/pages/mine/blackList')"></view>
				</view>

				<view style="padding:0rpx 30rpx;box-sizing: border-box;">
					<uc-follow v-for="(item, index) in listUserFollow" :key="index" :item="item"
						:tabIndex="tabsIndex"></uc-follow>
					<u-empty v-if="!listUserFollow.length" icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1"
						marginTop="100"></u-empty>
				</view>
			</view>
		</template>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	export default {
		name: 'message',
		data() {
			return {
				tablist: [{
						name: '朋友',
						type: 'friend',
					}, {
						name: '关注',
						type: 'follow',
						count: 0
					},
					{
						name: '粉丝',
						type: 'fans',
					}
				],
				chatTablist: [{
						name: '聊天',
						type: 'chat',
						count: 0
					},
					{
						name: '朋友',
						type: 'friend',
						count: 0
					},
				],
				page: 1,
				currentType: "chat",
				friendCurrentIndex: 0,
				listUserFollow: [],
				tabsIndex: 0,
			}
		},
		onLoad(option) {
			var that = this;
			uni.$on("followClic", function() {
				that.listUserFollow = []
				that.getUserFollow()
			})
		},
		onShow() {
			uni.showTabBar()
			this.listUserFollow = []
			this.getUserFollow()
			getApp().globalData.getUnReadFun()
		},

		methods: {
			changeTab(e) {
				let that = this;
				that.page = 1;
				that.listUserFollow = [];
				that.tabsIndex = e.index;
				that.getUserFollow()
			},
			click(e) {
				this.tabsIndex = e.index;
			},
			onReachBottom() {
				let that = this;
				that.page++;
				that.getUserFollow();
			},
			//tab切换
			chatChangeTab(e) {
				this.currentType = e.type;
			},
			//朋友
			getUserFollow(e) {
				let that = this;
				that.$api('user_follow.lists', {
					type: this.tablist[this.tabsIndex].type,
					page: this.page
				}).then(res => {
					if (res.code === 1) {
						that.listUserFollow.push(...res.data);
					}
				})
			},
			//跳转聊天页面
			openChat(item, index, itemCount) {
				this.$store.commit("setMsgCount", item.no_read_count);
				this.$store.commit("setMessageListCount", item);
				this.$nextTick(() => {
					this.$u.route(`pages/chat/single`, {
						user_id: item.user_id
					});
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background: #F8F8F8;
	}

	.hedaBar {
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background: rgba(255, 254, 254, 1);
		padding-top: var(--status-bar-height);
	}

	// 朋友
	.friendContainer {
		box-sizing: border-box;

		.friendTab {
			display: flex;
			align-items: center;
			color: #666666;
			font-size: 30rpx;

			.friendTabItem {
				margin-right: 30rpx;
			}
		}
	}

	// 聊天
	.SystemNoticeContainer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		background: #fff;

		.notice {
			width: 96rpx;
			height: 96rpx;
			background: #FFB96A;
			font-size: 50rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 96rpx;
			color: #fff;
			margin-right: 30rpx;
		}
	}


	.noticeRight {
		flex: 1;
		height: 96rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;

		.tips2 {
			background: #f43530;
			text-align: center;
			width: 35rpx;
			height: 35rpx;
			border-radius: 50rpx;
			font-size: 20rpx;
			line-height: 35rpx;
			color: #fff;
		}
	}

	.userImg {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}



	.tips {
		background: #f43530;
		color: #fff;
		text-align: center;
		padding: 0rpx 15rpx;
		border-radius: 50rpx;
	}


	.msgContent {
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bannerBox {
		width: 690rpx;
		height: 140rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.noticeContent {
		color: #808080;
		font-size: 26rpx;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>