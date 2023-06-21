<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="" style="margin-left: 340rpx; font-size: 35rpx;margin-top: 80rpx;"> 消息</view>
	<view class="px-4 " :style="`padding-top: 80rpx;`">
		<!-- 动态消息 -->
		<view v-if="fei_list.length>0">
			<view
				style="display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #ededed;padding: 30rpx 0rpx;"
				v-for="(item,index) in fei_list" :key="index" @click="openChat(item,index,item.msgNum)">
				<!-- <view class="notice">
					<text class="ri-notification-3-fill icon"></text>
				</view> -->
				<image class="userImg" :src="item.avatar"></image>
				<view class="noticeRight">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<text
							style="font-size: 30rpx;color:#323232;font-weight: bold;">{{item.role_realname}}·{{item.role_dynasty}}</text>
						<text
							style="font-size: 24rpx;color:#999999;">{{ $u.timeFormat(item.createtime, 'mm-dd hh:MM') }}</text>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='text'">{{item.content}}</text>
						<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='image'">[ 图片 ]</text>
						<text style="font-size: 26rpx;color:#808080;" v-if="item.type=='audio'">[ 语音 ]</text>
						<text class="tips" v-if="item.msgNum"></text>
					</view>
				</view>
			</view>
		</view>

		<u-empty v-if="!$store.state.message.messageList.length" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
			marginTop="100"></u-empty>

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
				fei_list: []
			}
		},
		onLoad(option) {
			let that = this;
		},
		onShow() {
			this.initList()
		},
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
		},
		methods: {
			initList() {
				this.fei_list = this.$store.state.message.messageList;
				this.$forceUpdate()
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
						// console.log(res,'s');/
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listMessage = [...that.listMessage, ...res.data]
						// console.log('  that.listMessage ',  that.listMessage );
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
</style>