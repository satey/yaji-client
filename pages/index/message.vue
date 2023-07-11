<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<u-navbar title="消息" :safeAreaInsetTop="true" :placeholder="true">
		<view slot="left"></view>
	</u-navbar>
	<!-- <view class="" style="margin-left: 340rpx; font-size: 35rpx;padding-top:var(--status-bar-height)"> 消息</view> -->
	<view class="px-4 ">
		<!-- 动态消息 -->
		<view @click="openTrendsMsg">
			<view
				style="display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #ededed;padding: 30rpx 0rpx;">
				<view class="notice">
					<text class="ri-notification-3-fill icon"></text>
				</view>
				<view class="noticeRight">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<text style="font-size: 30rpx;color:#323232;">动态消息</text>
						<text v-if="realname!= undefined"
							style="font-size: 24rpx;color:#999999;">{{ $u.timeFormat(createtime, 'mm-dd hh:MM') }}</text>
					</view>
					<view style="color: #808080;font-size: 26rpx;" v-if="realname == undefined">暂无动态消息</view>
					<view style="display: flex;align-items: center;justify-content: space-between;"
						v-if="realname!= undefined">
						<view style="color: #808080;font-size: 26rpx;">
							<text>{{realname}}.{{dynasty}}</text>
							<text v-if="cate == 1">给您评论了！</text>
							<text v-if="cate == 2">给您动态点赞了！</text>
							<text v-if="cate == 3">给您评论点赞了！</text>
							<text v-if="cate == 4">回复您的评论了！</text>
							<text v-if="cate == 5">查看您的主页了！</text>
						</view>
						<view v-if="no_read_count!=0" class="tips">
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户消息 -->
		<view v-if="fei_list.length>0">
			<view v-for="(item,index) in topMsgList2" @click="openChat(item,index,item.msgNum)">
				<view
					style="display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #ededed;padding: 30rpx 0rpx;position: relative;"
					v-if="item.user_id!=undefined  && item.is_topping == 1">
					<!-- <view class="notice">
				<text class="ri-notification-3-fill icon"></text>
			</view> -->
					<image class="userImg" :fade-show="true" :src="item.avatar"></image>
					<view
						style="position: absolute;top: -22rpx;left: -22rpx;transform: rotate(46deg);font-size: 50rpx;color: #EB3446;"
						class="ri-arrow-left-s-fill"></view>
					<view class="noticeRight">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<text
								style="font-size: 30rpx;color:#323232;">{{item.role_realname}}·{{item.role_dynasty}}</text>
							<text
								style="font-size: 24rpx;color:#999999;">{{ $u.timeFormat(item.createtime, 'mm-dd hh:MM') }}</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view class="msgContent" style="font-size: 26rpx;color:#808080;" v-if="item.type=='text'">
								{{item.content}}
							</view>
							<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='image'">[ 图片 ]</text>
							<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='audio'">[ 语音 ]</text>
							<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='gift'">[ 礼物 ]</text>
							<text class="tips" v-if="item.msgNum"></text>
						</view>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in fei_list" :key="index" @click="openChat(item,index,item.msgNum)">
				<view
					style="display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #ededed;padding: 30rpx 0rpx;"
					v-if="item.user_id!=undefined && item.is_topping == 0">
					<!-- <view class="notice">
					<text class="ri-notification-3-fill icon"></text>
				</view> -->
					<image class="userImg" :src="item.avatar"></image>
					<view class="noticeRight">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<text
								style="font-size: 30rpx;color:#323232;">{{item.role_realname}}·{{item.role_dynasty}}</text>
							<text
								style="font-size: 24rpx;color:#999999;">{{ $u.timeFormat(item.createtime, 'mm-dd hh:MM') }}</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view class="msgContent" style="font-size: 26rpx;color:#808080;" v-if="item.type=='text'">
								{{item.content}}
							</view>
							<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='image'">[ 图片 ]</text>
							<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='audio'">[ 语音 ]</text>
							<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='gift'">[ 礼物 ]</text>
							<text class="tips" v-if="item.msgNum"></text>
						</view>
					</view>
				</view>
			</view>

		</view>

		<u-empty v-if="!$store.state.message.messageList.length" icon="/static/wupinglun.png" text="暂无消息"
			textColor="#a1a1a1" marginTop="100"></u-empty>

		<!-- <view class="flex justify-between">
			<u-tabs :list="tablist" lineColor="rgba(255, 0, 0, 0.2)" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;" inactiveStyle="color: #787878; transform: scale(1);" activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
            </u-tabs> 
			<view class="pt-2">
                <i class="ri-brush-3-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="showRead = true"></i>
            </view> 
        </view> -->
		<!-- <uc-message :key="index" :item="listMessage"></uc-message> -->
		<!-- <u-loadmore v-if="listMessage.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" /> -->
		<!-- <u-empty v-if="!listMessage.length" icon="/static/fly.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty> -->

		<!-- <u-modal :show="showRead" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="mt-6">确定清空所有未读消息吗？</view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false">取消</view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="doReadMessage()">确定</view>
                </view>
            </view>
        </u-modal> -->

		<!-- <uc-auth></uc-auth> -->
		<uc-tabbar></uc-tabbar>
	</view>
</template>
<script>
	export default {
		name: 'message',
		components: {},
		data() {
			return {
				// tablist: [
				//     { name: '全部', type: 'all', count: 0 },
				//     { name: '朋友', type: 'friend', count: 0 },
				//     { name: '粉丝', type: 'fans', count: 0 },
				//     { name: '系统', type: 'system', count: 0 },
				// ],
				listMessage: [],
				params: {
					page: 1,
					limit: 10
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				showRead: false,
				num: null,
				isListMessage: false,
				fei_msgList: [],
				llist: [],
				// ---------
				fei_list: [],
				cate: "",
				createtime: "",
				dynasty: "",
				realname: "",
				no_read_count: "",
				topMsgList: [],
				topMsgList2: []
			}
		},
		onLoad(option) {
			let that = this;
		},
		onShow() {
			this.trendsMsg();
			this.initList();
		},
		watch: {
			topMsgList: {
				handler(newv, oldv) {
					this.sortMsg(newv)
				},
				deep: true
			}
		},
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
		},
		methods: {
			sortMsg(oldv) {
				var arr = []
				arr = oldv.filter((val, index) => {
					return val.is_topping == 1
				})
				arr.sort((a, b) => {
					return b.topping_time - a.topping_time
				})
				this.topMsgList2 = arr
			},
			//动态消息
			trendsMsg() {
				var that = this;
				that.$api('message.trendsMsg').then(res => {
					if (res.code === 1) {
						that.cate = res.data.data.cate;
						that.createtime = res.data.data.createtime;
						that.dynasty = res.data.data.dynasty;
						that.realname = res.data.data.realname;
						that.no_read_count = res.data.no_read_count;
					}
				})
			},
			openTrendsMsg() {
				this.$u.route('/pages/chat/trendsMsg');
			},
			initList() {
				this.fei_list = this.$store.state.message.messageList;
				this.topMsgList = this.$store.state.message.messageList
			},
			openChat(item, index, itemCount) {
				this.$store.commit("setMessageListCount", item.user_id);
				this.$store.commit("setMsgCount2");
				this.$nextTick(() => {
					this.initList();
					this.$u.route(`pages/chat/single?user_id=${item.user_id}&megPgae=true`);
				})
			},
			async getMessage() {
				let that = this
				that.loadmore = 'loading'
				that.$api('message.lists', that.params).then(res => {
					if (res.code === 1) {
						console.log(res)
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listMessage = [...that.listMessage, ...res.data]
						// 监听消息
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			// async doReadMessage() {
			//     let that = this
			//     that.showRead = false
			//     that.$api('message.readall').then(res => {
			//         if (res.code === 1) {
			//             that.$u.toast('操作成功')
			//             that.listMessage = []
			//             that.getMessage()
			//         } else {
			//             that.$u.toast(res.msg)
			//         }
			//     })
			// },
		}
	}
</script>
<style lang="scss" scoped>
	.notice {
		width: 96rpx;
		height: 96rpx;
		background: #FE4373;
		font-size: 50rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 96rpx;
		color: #fff;
		margin-right: 30rpx;
	}

	.noticeRight {
		flex: 1;
		height: 96rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
	}

	.userImg {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.tips {
		background: #EB3446;
		color: #fff;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		text-align: center;
	}

	.msgContent {
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>