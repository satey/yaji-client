<template>
	<view>
		<u-navbar title="对话设置" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<!-- $u.route('/pages/user/home',{user_id:$Route.query.user_id}) -->
		<view style="padding: 30rpx;display: flex;align-items: center;justify-content: space-between;"
			@click="openUrl('/pages/user/home',{user_id:$Route.query.user_id})">
			<view style="display: flex;align-items: center;">
				<image mode="aspectFill" :src="avatar" style="width: 78rpx;height: 78rpx;border-radius: 50%;"></image>
				<text
					style="color: #323232;font-size: 28rpx;margin-left: 16rpx;">{{realname||'无名氏'}}·{{dynasty||''}}</text>
			</view>
			<text class="ri-arrow-right-s-line" style="font-size: 40rpx;color: #cccccc;"></text>
		</view>
		<view style="padding:30rpx;display: flex;align-items: center;justify-content: space-between;" @click="copy">
			<view style="color: #323232;font-size: 28rpx;">雅集号</view>
			<view style="display: flex;align-items: center;color: #808080;font-size: 28rpx;">
				<text>{{uid||"*******"}}</text>
				<text class="ri-file-copy-2-line" style="margin-left: 5rpx;"></text>
			</view>
		</view>
		<!-- 	<view style="padding:30rpx;display: flex;align-items: center;justify-content: space-between;">
			<view style="color: #323232;font-size: 28rpx;">消息免打扰</view>
			<view>
				<switch color="#FE4373" :checked="disturbChecked" style="transform:scale(0.7)" @click="disturb" />
			</view>
		</view> -->
		<view style="padding:30rpx;display: flex;align-items: center;justify-content: space-between;">
			<view style="color: #323232;font-size: 28rpx;">对话顶置</view>
			<view>
				<switch color="#FE4373" :checked="toppingChecked" style="transform:scale(0.7)" @change="topping" />
			</view>
		</view>
		<!-- <view style="padding:30rpx;display: flex;align-items: center;justify-content: space-between;">
			<view style="color: #323232;font-size: 28rpx;">加入黑名单</view>
			<view>
				<switch color="#FE4373" :checked="blackIsChecked" style="transform:scale(0.7)" @change="addBlack" />
			</view>
		</view> -->
		<view style="padding:30rpx;display: flex;align-items: center;justify-content: space-between;"
			@click="openUrl('/pages/public/report',{user_id:$Route.query.user_id,type:'聊天',selectId:$Route.query.user_id})">
			<view style="color: #323232;font-size: 28rpx;">举报</view>
			<view>
				<text class="ri-arrow-right-s-line" style="font-size: 40rpx;color: #cccccc;"></text>
			</view>
		</view>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	export default {
		name: "charSeting",
		data() {
			return {
				realname: "",
				dynasty: "",
				uid: "",
				avatar: "",
				blackIsChecked: null,
				toppingChecked: null,
				disturbChecked: null,
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			//初始化
			init() {
				var that = this;
				that.$api('user.profile', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.realname = res.data.role.realname;
						that.dynasty = res.data.role.dynasty;
						that.uid = res.data.uid;
						that.avatar = res.data.avatar;
					}
				})
				that.$api('user_black.lists', {
					"black_user_id": that.$Route.query.user_id,
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length == 0) {
							that.blackIsChecked = false;
						} else {
							that.blackIsChecked = true;
						}
					}
				})
				that.$api('message.lists').then(res => {
					if (res.code == 1) {
						var data1 = res.data.data;
						for (var i = 0; i < data1.length; i++) {
							if (data1[i].user_id == that.$Route.query.user_id) {
								if (data1[i].is_topping == 1) {
									that.toppingChecked = true;
								} else {
									that.toppingChecked = false;
								}
							}
						}
					}
				})
				// that.$api('message.disturbList', {
				// 	"no_disturb_user_id": that.$Route.query.user_id
				// }).then(res => {
				// 	if (res.code == 1) {
				// 		that.disturbChecked = true;
				// 	} else {
				// 		that.disturbChecked = false;
				// 	}
				// })
			},
			//免打扰
			// disturb() {
			// 	var that = this;
			// 	that.$api('message.addDisturbList', {
			// 		"no_disturb_user_id": that.$Route.query.user_id
			// 	}).then(res2 => {
			// 		if (res2.code == 1) {
			// 			that.$u.toast(res2.msg);
			// 		}
			// 	})
			// },
			//消息置顶
			topping() {
				var that = this;
				that.$api('message.topping', {
					"topping_user_id": that.$Route.query.user_id,
				}).then(res => {
					if (res.code == 1) {
						if (res.msg == "置顶成功") {
							var messageList = that.$store.state.message.messageList;
							messageList.forEach((val, index) => {
								if (val.user_id == that.$Route.query.user_id) {
									messageList[index].is_topping = 1;
									messageList[index].topping_time = res.time;
								}
							})
							this.$store.commit("setMessageList", messageList);
						} else {
							var messageList = that.$store.state.message.messageList;
							messageList.forEach((val, index) => {
								if (val.user_id == that.$Route.query.user_id) {
									messageList[index].is_topping = 0
								}
							})
							this.$store.commit("setMessageList", messageList);
						}
						that.$u.toast(res.msg);
						// console.log(that.$Route.query.user_id)
						// console.log(that.$store.state.message.messageList)
					}
				})
			},
			//复制雅集号
			copy() {
				var that = this;
				uni.setClipboardData({
					data: String(that.uid),
					success: function() {
						//调用方法成功
						console.log('success');
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			//拉黑
			addBlack(e) {
				this.blackApi(this.$Route.query.user_id)
			},
			blackApi() {
				var that = this;
				that.$api('user_black.add', {
					black_user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.$u.toast(res.msg)
					}
				})
			},
			//跳转
			openUrl(pages, query) {
				this.$u.route(pages, query)
			}
		}
	}
</script>

<style>
</style>