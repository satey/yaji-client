<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<!-- <image class="fixed w-full top-0 left-0 right-0 -z-10" src='@/static/user_background.png' /> -->
		<u-navbar :bgColor="headColor">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-block text-4xl"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center">
				<view style="color: #323232;" v-if="headColor=='#fff'">
					{{ role.realname || '无名氏' }}·{{role.dynasty || '未知朝代' }}</view>
			</view>
		</u-navbar>
		<u-modal :show="followModule" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="确定" cancelText="取消" @cancel="followModule=false" @confirm="unfollow">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>是否取消关注？</text>
				</view>
			</view>
		</u-modal>
		<view class="homeHead">
			<view style="margin-top: 80rpx;">
				<image class="rounded-full bg-gray-100" :src="user.avatar || '/static/avatar.png'"
					style="width: 140rpx;height: 140rpx;">
				</image>
			</view>
			<view class="text-xl mt-2">
				<text style="font-size: 36rpx;color: #fff;" class="font-bold">
					{{ role.realname || '无名氏' }}·{{role.dynasty || '未知朝代' }}</text>
			</view>
			<view style="color: #fff;font-size: 26rpx;margin-top: 20rpx;">雅集号：{{ user.uid || '********' }}</view>
			<view style="color: #fff;font-size: 26rpx;margin-top: 20rpx;">IP属地：{{ user.province || '未知' }}</view>
			<view style="color: #fff;font-size: 26rpx;margin-top: 20rpx;">名望：{{ user.total_mw || 0 }}</view>
			<view style="display: flex;margin-top: 30rpx;">
				<view style="display: flex;align-items: center;margin-right: 50rpx;"><text
						style="color: #fff;font-size: 36rpx;margin-right: 10rpx;"
						class="font-bold">{{ user.follow_count || 0  }}</text><text <text
						style="color: #fff;font-size: 24rpx;">关注</text></view>
				<view style="display: flex;align-items: center;margin-right: 50rpx;"><text
						style="color: #fff;font-size: 36rpx;margin-right: 10rpx;"
						class="font-bold">{{ user.fans_count || 0 }}</text><text <text
						style="color: #fff;font-size: 24rpx;">粉丝</text></view>
				<view style="display: flex;align-items: center;"><text
						style="color: #fff;font-size: 36rpx;margin-right: 10rpx;"
						class="font-bold">{{ user.digg_count || 0 }}</text><text <text
						style="color: #fff;font-size: 24rpx;">获赞</text></view>
			</view>
		</view>
		<view style="padding: 30rpx;border-radius: 30rpx 30rpx 0px 0px;margin-top: -30rpx;background: #fff;">
			<u-tabs :list="tablist" lineColor="#FE4373" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;"
				inactiveStyle="color: #787878; transform: scale(1);"
				activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
			</u-tabs>
			<block v-if="type === 'post'">
				<uc-mypost v-for="(item, index) in postList" :key="index" :item="item"></uc-mypost>
				<u-loadmore v-if="postList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
				<u-empty v-if="!postList.length" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</block>
			<block v-if="type === 'role'">
				<view class="grid grid-cols-12 gap-4 mt-4" v-if="role != null">
					<view class="col-span-2 text-gray-500">姓名：</view>
					<view class="col-span-4">{{ role.realname||"" }}</view>
					<view class="col-span-2 text-gray-500">拼音：</view>
					<view class="col-span-4">{{ role.chnname||"" }}</view>
					<view class="col-span-2 text-gray-500">性别：</view>
					<view class="col-span-4">{{ role.gender === 1 ? '男' : '女'}}</view>
					<view class="col-span-2 text-gray-500">朝代：</view>
					<view class="col-span-4">{{ role.dynasty||"" }}</view>
					<view class="col-span-2 text-gray-500">生年：</view>
					<view class="col-span-4">{{ role.birthyear||'?'}}</view>
					<view class="col-span-2 text-gray-500">卒年：</view>
					<view class="col-span-4">{{ role.deathyear||'?'}}</view>
					<view class="col-span-2 text-gray-500">别称：</view>
					<view class="col-span-4">{{ role.aliasnames||"" }}</view>
					<view class="col-span-2 text-gray-500">身份：</view>
					<view class="col-span-4">
						<!-- <block v-for="(tag, index) in role.titles" :key="index" :item="tag">
							<text class="mr-4">{{ tag }}</text>
						</block> -->
						<text class="mr-4" v-if="role == null">
							?
						</text>
						<block v-else v-for="(tag, index) in role.achievements" :key="index" :item="tag">
							<text class="mr-4">{{ tag }}</text>
						</block>
					</view>
				</view>
				<view style="margin-top: 25rpx;display: flex;">
					<view class="text-gray-500">简介：</view>
					<view class="" style="flex: 1;color: #323232;font-size: 28rpx;">{{ role.content }}</view>
				</view>

			</block>
		</view>
		<!-- --------------------- -->
		<view style="height: 220rpx;"></view>
	</view>

	<view
		class="grid grid-cols-2 gap-4 p-4 fixed left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white z-10">
		<view class="flex items-center justify-center p-4 rounded-full bg-rose-500"
			@click="$u.route('pages/chat/single', {user_id:user_id})">

			<i class="ri-message-3-fill text-xl text-white mr-2"></i>
			<text class="text-base text-white"> 打招呼</text>
		</view>
		<view v-show='is_follow==0' class="flex items-center justify-center p-4 rounded-full bg-rose-500">
			<i class="ri-heart-3-fill text-xl text-white mr-2"></i>
			<text class="text-base text-white" @click="interest(1)">关注</text>
		</view>
		<view v-show="is_follow==1" class="flex items-center justify-center p-4 rounded-full bg-gray-300">
			<text class="text-base text-white" @click="interest(2)">已关注</text>
		</view>
	</view>

	<uc-auth></uc-auth>
	</view>
</template>
<script>
	import loginVue from '../auth/login.vue'
	export default {
		name: 'mine',
		components: {},
		data() {
			return {
				type: 'role',
				tablist: [{
					name: '角色',
					type: 'role',
					count: 0
				}, {
					name: '动态',
					type: 'post',
					count: 0
				}],
				user: {},
				role: {},
				userData: {},
				postList: [],
				params: {
					type: 'all',
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				user_id: '',
				is_follow: '',
				followModule: false,
				headColor: "rgba(0,0,0,0)"
			}
		},
		onLoad() {
			let that = this
			that.getUserProfile()
			that.getUserRole()
			that.getUserPost()
			that.getUserData()
			that.look_user_home()
		},
		onPageScroll(e) {
			if (parseInt(e.scrollTop) >= 50) {
				this.headColor = "#fff"
			} else {
				this.headColor = "rgba(0,0,0,0)"
			}
		},
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
			that.getUserPost();
		},
		mounted() {
			let that = this
			that.user_id = that.$Route.query.user_id
		},
		methods: {
			look_user_home() {
				var that = this;
				that.$api('user.look_user_home', {
					user_id: that.$Route.query.user_id
				})
			},
			//取消关注
			unfollow() {
				var that = this;
				that.$api('user_follow.follow', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						console.log('取消成功');
						that.is_follow == 0;
						that.followModule = false;
						that.getUserProfile()
					} else {
						console.log('25');
					}
				})
			},
			interest(type) {
				let that = this
				if (type == 1) {
					that.$api('user_follow.follow', {
						user_id: that.$Route.query.user_id
					}).then(res => {
						that.is_follow == 1
						that.getUserProfile()
					})
				}
				if (type == 2) {
					that.followModule = true;
					// uni.showModal({
					// 	title: '提示',
					// 	content: '确定要取消关注用户？',
					// 	confirmText: "确定", //这块是确定按钮的文字
					// 	cancelText: "取消", //这块是取消的文字
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			console.log(that.$Route.query.user_id);
					// 			that.$api('user_follow.follow', {
					// 				user_id: that.$Route.query.user_id
					// 			}).then(res => {
					// 				if (res.code === 1) {
					// 					// that.user = res.data
					// 					console.log('取消成功');
					// 					that.is_follow == 0
					// 					// that.isInterest=!that.isInterest
					// 					that.getUserProfile()
					// 				} else {
					// 					console.log('25');
					// 				}
					// 			})
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
				}
			},
			changeTab(e) {
				let that = this
				that.type = e.type
			},
			async getUserProfile() {
				let that = this
				// console.log(that.$Route.query.user_id);
				that.$api('user.profile', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.user = res.data
						that.is_follow = res.data.is_follow
					}
				})
			},
			async getUserData() {
				let that = this
				that.$api('user.info', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.userData = res.data
					}
				})
			},
			async getUserRole() {
				let that = this
				that.$api('user.profile', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						if (res.data != null) {
							that.role = res.data.role;
						} else {
							that.role = null
						}
					}
				})
			},
			async getUserPost() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.user', {
					page: that.params.page,
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.postList = [...that.postList, ...res.data.data]
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.homeHead {
		height: 710rpx;
		background: url(@/static/userBg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		box-sizing: border-box;
		padding: 140rpx 30rpx 0rpx 30rpx;
	}
</style>