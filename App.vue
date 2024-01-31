<script>
	import Vue from 'vue';
	import Wechat from './common/wechat/wechat.js';
	// import permision from "@/js_sdk/wa-permission/permission.js"
	// import chat from "./common/chat.js"
	import push from "@/js_sdk/dc-push/push.js"
	export default {
		globalData: {
			socketTask: null, //全局的socket
			timmer: null,
			wsOnlion: false,
			islogout: null,
			initFun: null, //缓存socket初始化的方法
			getHistoryCronyList: null, //进来获取storege的聊天列表
			isSelectImage: false, //如果是选择图片的话不关闭socket
			getUnReadFun: null,
			isConnectedFlag: false,
			socketCount: 0,
		},
		methods: {
			//重连
			reconnect() {
				var timeout1 = setTimeout(() => {
					var token = uni.getStorageSync("token");
					if (token != '') {
						if (getApp().globalData.wsOnlion == false) {
							getApp().globalData.initFun = null;
							getApp().globalData.socketTask = null;
							uni.showLoading({
								title: '连接中',
								mask: true
							})
							if (getApp().globalData.isConnectedFlag == false) {
								clearInterval(getApp().globalData.timmer)
								var timeOut = setTimeout(() => {
									this.initSocket()
									clearTimeout(timeOut)
									uni.hideLoading()
								}, 2000)
							}
						}
					}
					clearTimeout(timeout1)
				}, 2000)
			},
			//是否在房间
			isRoom() {
				if (uni.getStorageSync("roomData") != '') {
					const currentPage = getCurrentPages();
					if (currentPage[currentPage.length - 1 <= 0 ? 0 : currentPage.length - 1].route ==
						'pages/index/index') {
						uni.$emit("changeRoom", {
							msg: 'index'
						})
					} else if (currentPage[currentPage.length - 1 <= 0 ? 0 : currentPage.length - 1].route ==
						'pages/qsls/qsls') {
						uni.$emit("changeRoom", {
							msg: 'qsls'
						})
					} else if (currentPage[currentPage.length - 1 <= 0 ? 0 : currentPage.length - 1].route ==
						'pages/chat/chatRoom') {
						uni.$emit("changeRoom", {
							msg: 'chatRoom'
						})
					}
				}
			},
			//监听通知
			pushMsg() {
				var that = this;
				uni.onPushMessage((res) => {
					console.log(res)
					uni.createPushMessage({
						title: res.data.title,
						content: res.data.content,
						icon: "./static/logo.png",
						sound: "system",
						fail() {
							uni.showToast({
								icon: "error",
								title: "通知栏失败"
							})
						}
					})
				})
			},
			//统计
			isLogin() {
				var token = uni.getStorageSync("token");
				var that = this;
				if (uni.getStorageSync("audioEmpower") == '') {
					uni.setStorageSync("audioEmpower", false)
					uni.setStorageSync("audioEmpowerCount", 0)
				}
				if (uni.getStorageSync("imageEmpower") == '') {
					uni.setStorageSync("imageEmpower", false)
					uni.setStorageSync("imageEmpowerCount", 0)
				}

				uni.getPushClientId({
					success(res) {
						that.$api('stat.init', {
							"push_clientid": res.cid
						}).then(data => {})
					}
				})
			},
			//单聊-清除未读消息数
			clearUnReadMsg(user_id) {
				var that = this;
				that.$api("chat.clearUnReadMsg", {
					to_user_id: user_id
				}).then(res => {
					that.getUnRead()
				})
			},
			//获取未读消息
			getUnRead() {
				var that = this;
				getApp().globalData.getUnReadFun = function() {
					if (uni.getStorageSync("token") == "") {
						return;
					}
					that.$api('message.lists').then(res => {
						if (res.code == 1) {
							that.$store.commit("setMessageList", res.data)
							that.$store.commit("initMsgCount", res.data.no_read_total_count)
						}
					})
				}
				getApp().globalData.getUnReadFun()
			},
			//主动关闭websocket
			closeScoket: function() {
				let that = this;
				clearInterval(getApp().globalData.timmer);
				getApp().globalData.wsOnlion = false;
				if (!getApp().globalData.socketTask) {
					return;
				}
				getApp().globalData.socketTask.close({
					success(res) {
						getApp().globalData.wsOnlion = false;
						getApp().globalData.socketTask = null;
						console.log("全局socket关闭成功", res)
					},
					fail(err) {
						console.log("全局socket关闭失败", err)
					}
				})
			},
			//连接成功之后做两秒的一次连接(心跳机制)
			sendPingPong() {
				let that = this;
				getApp().globalData.timmer = setInterval(function() {
					if (getApp().globalData.wsOnlion == true) {
						let obj = {
							type: 'ping'
						};
						let objStr = JSON.stringify(obj);
						getApp().globalData.socketTask.send({
							data: objStr,
							success(res) {
								console.log("webscoket发送[心跳]信息成功");
							},
							fail() {
								//console.log("webscoket发送[心跳]信息失败");
							}
						});
					}
				}, 5000)
			},
			//监听消息列表  
			initSocket() {
				var that = this;
				var token = uni.getStorageSync('token');
				var session_id = uni.getStorageSync('CHATSESSIONID');
				getApp().globalData.initFun = this.initSocket;
				if (token == '') {
					return;
				}
				let userInfo = uni.getStorageSync('userInfo');
				if (userInfo.gender == 0) {
					return;
				}
				that.socKetUrl = `${uni.getStorageSync("hostData").socket}?token=${token}&session_id=${session_id}`;
				getApp().globalData.socketTask = uni.connectSocket({
					url: that.socKetUrl, //仅为示例，并非真实接口地址。
					complete: () => {
						console.log("全局长连接已建立完成");
						getApp().globalData.wsOnlion = true;
						//添加到离线消息
						that.getUnRead();
					},
				});
				// 监听 WebSocket 连接打开事件
				getApp().globalData.socketTask.onOpen(function(res) {
					console.log('全局Socket连接已打开！');
					that.isRoom()
					that.sendPingPong();
				})
				//监听 WebSocket 接受到服务器的消息事件
				getApp().globalData.socketTask.onMessage((res) => {
					getApp().globalData.socketCount = 0;
					const currentPage = getCurrentPages();
					var socketData = JSON.parse(res.data);
					if (socketData.cate == 'room') {
						if (currentPage[currentPage.length - 1].route != 'pages/qsls/qsls') {
							if (socketData.data.type == 'cup_task_run') {
								that.$store.commit("setQslsCupType", "1")
								that.$store.commit("setRoomId", socketData.data.room_id)
							} else if (socketData.data.type == 'cup_task_hit') {
								that.$store.commit("setQslsCupType", "2")
								that.$store.commit("setRoomId", socketData.data.room_id)
								that.$nextTick(() => {
									if (socketData.data.user_info.user_id == uni.getStorageSync("userInfo")
										.id) {
										that.$store.commit("setShowHif", true)
										uni.$emit('qslsTaskHit', {
											taskData: socketData.data
										})
									}
								})
							} else if (socketData.data.type == 'cup_task_end') {
								that.$store.commit("setQslsCupType", "3")
								that.$store.commit("setRoomId", socketData.data.room_id)
							} else if (socketData.data.type == 'cup_task_complete') {
								that.$store.commit("setQslsCupType", "3")
								that.$store.commit("setRoomId", socketData.data.room_id)
							}
						}
					}
					if (JSON.parse(res.data).cate == 'chat') {
						that.getUnRead()
						if (that.$Route.query.user_id == JSON.parse(res.data).data.from_user_id) {
							that.clearUnReadMsg(that.$Route.query.user_id)
						} else {
							if (socketData.data.room_id == undefined) {
								// #ifdef APP
								var textContent = "";
								switch (socketData.data.message.type) {
									case 'text':
										textContent = socketData.data.message.content;
										break;
									case "image":
										textContent = "[图片]"
										break;
									case "audio":
										textContent = "[语音]"
										break;
									case "type":
										textContent = "[礼物]"
										break;
									case "play":
										textContent = socketData.data.message.content;
										break;
								}
								uni.createPushMessage({
									title: `${socketData.data.from_user_info.role_realname}·${socketData.data.from_user_info.role_dynasty}`,
									content: textContent,
									icon: "./static/logo.png",
									sound: "system",
									fail() {
										uni.showToast({
											icon: "error",
											title: "通知栏失败"
										})
									}
								})
								// #endif
							}
						}
					}
				})

				getApp().globalData.socketTask.onClose(function(res) {
					console.log(res)
					console.log('全局Socket 已关闭！');
					getApp().globalData.wsOnlion = false;
					getApp().globalData.socketCount++;
					getApp().globalData.initFun = null;
					getApp().globalData.socketTask = null;
					if (getApp().globalData.isConnectedFlag == false) {
						clearInterval(getApp().globalData.timmer)
						var timeOut = setTimeout(() => {
							that.initSocket()
							clearTimeout(timeOut)
						}, 2000)
					}
				});
				getApp().globalData.socketTask.onError(function(error) {
					console.log(error)
					console.log("全局Socket连接打开失败，请检查！");
					getApp().globalData.wsOnlion = false;
					getApp().globalData.socketCount++;
					that.closeScoket()
				})
			},
		},
		onShow() {
			var that = this;
			this.reconnect()

		},
		onLaunch: function() {
			var that = this;
			this.initSocket();
			this.isLogin()
			this.pushMsg();
			// #ifdef APP-PLUS
			// 锁定竖屏
			plus.screen.lockOrientation("portrait-primary");
			// #endif
			uni.onNetworkStatusChange(function(res) {
				if (res.isConnected == true) {
					getApp().globalData.isConnectedFlag = false;
					clearInterval(getApp().globalData.timmer)
					getApp().globalData.initFun = null;
					getApp().globalData.wsOnlion = false;
					getApp().globalData.initFun = null;
					getApp().globalData.socketTask = null;
					that.initSocket()
					uni.hideLoading()
				} else {
					getApp().globalData.isConnectedFlag = true;
					uni.showLoading({
						mask: true,
						title: "无网络"
					})
				}
			});
		},
		onHide: function() {
			var that = this;
			var userInfo = uni.getStorageSync("userInfo");
			if (!userInfo) {
				return;
			}
			// // -----------------
			if (getApp().globalData.isSelectImage) {
				return;
			}
		},
	};
</script>


<style lang="scss">
	/* #ifdef APP-VUE || H5 */
	// @import 'static/style/color.scss';
	// @import 'static/style/main.scss';
	@import "static/tailwindcss/tailwind.css";
	@import 'static/remixicon/remixicon.css';
	@import 'static/iconfont/icons.css';
	@import 'static/iconfont/iconColors.css';

	// page {
	// 	font-family: Monospaced Number, Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif !important;
	// }

	/* #endif */
</style>