<!-- git -->
<script>
	import Vue from 'vue';
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';
	import Wechat from './common/wechat/wechat.js';
	// import permision from "@/js_sdk/wa-permission/permission.js"
	// import chat from "./common/chat.js"
	import push from "@/js_sdk/dc-push/push.js"
	import Socket from '@/common/utils/f_socket.js'
	import message from './common/store/modules/message.js';
	export default {
		globalData: {
			socketTask: null, //全局的socket
			timmer: null,
			wsOnlion: false,
			islogout: null,
			initFun: null, //缓存socket初始化的方法
			getHistoryCronyList: null, //进来获取storege的聊天列表
			isSelectImage: false, //如果是选择图片的话不关闭socket
			renew: {},
		},
		updated() {
			if (getApp().globalData.islogout == false) {
				this.initSocket();
				getApp().globalData.islogout = null
			}
		},

		methods: {
			...mapActions(['getAppInit', 'getRoutes', 'getUserInfo']),
			//监听通知
			pushMsg() {
				var that = this;
				uni.onPushMessage((res) => {
					console.log(res)
					var isPush = false;
					// -----礼包
					if (res.data.title == "礼包") {
						that.$store.commit("setGiftId", res.data.content);
						isPush = true;
					}
					if (res.type == 'receive') {
						if (!isPush) {
							uni.createPushMessage({
								title: res.data.title,
								content: res.data.content,
								icon: "./static/logo-28.png",
								sound: "system",
								fail() {
									uni.showToast({
										icon: "error",
										title: "通知栏失败"
									})
								}
							})
						}
					}
					if (res.data.title == "小雅") {
						if (res.data.content.indexOf("的世界") != -1) {
							var list = that.$store.state.message.messageList;
							var obj = {
								"avatar": "https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/uploads/20230727/245306ec74804174043aa9e55a2c4b3cc4de7c.png",
								"user_id": 1,
								"role_realname": res.data.title,
								"role_dynasty": "秦",
								"createtime": Date.parse(new Date()).toString(),
								"type": "text",
								"content": res.data.content,
								"is_topping": "",
								"topping_time": "",
								"msgNum": 1
							}
							list.push(obj)
							that.$store.commit("setMessageList", list)
							that.$store.commit("setMsgCount", list)
						}
					}
				})
			},
			//更新
			renew() {
				var that = this;
				that.$api("versions.index").then(res => {
					if (res.data == null) {
						return;
					}
					that.$store.commit("setRenewContent", res.data.content);
					that.$store.commit("setDownloadUrl", res.data.downloadurl);
					that.$store.commit("setisEnforce", res.data.enforce);
					var version = res.data.newversion.slice(1);
					// #ifdef APP-PLUS
					plus.runtime.getProperty(plus.runtime.appid, (info) => {
						if (info.version != version) {
							that.$store.commit("setisRenew", true)
						}
					})
					// #endif
				})
			},
			//统计
			isLogin() {
				var token = uni.getStorageSync("token");
				var that = this;
				if (token == '') {
					uni.reLaunch({
						url: '/pages/auth/login'
					});
				} else {
					//统计
					uni.getPushClientId({
						success(res) {
							console.log(res)
							that.$api('stat.init', {
								"push_clientid": res.cid
							}).then(data => {})
						}
					})
				}
			},
			//获取未读消息
			getUnRead() {
				var that = this;
				that.$api('message.lists').then(res => {
					if (res.code == 1) {
						var arr = that.$store.state.message.messageList;
						res.data.data.forEach((val, index) => {
							var obj = {};
							obj.avatar = val.avatar;
							obj.type = val.chat_message_type;
							obj.user_id = val.user_id;
							obj.role_realname = val.realname;
							obj.createtime = val.send_time;
							obj.role_dynasty = val.dynasty;
							obj.content = val.chat_message_content;
							obj.receiver_id = val.user_id;
							obj.msgNum = val.no_read_count;
							obj.is_topping = val.is_topping;
							obj.topping_time = val.topping_time;
							for (var i = 0; i < arr.length; i++) {
								if (arr[i].user_id == val.user_id) {
									arr.splice(i, 1)
								}
							}
							arr.push(obj)
						})
						arr.sort(function(a, b) {
							return b.createtime < a.createtime ? -1 : 1;
						})
						that.$store.commit("appendUnRead", arr);
						that.$store.commit("setMsgCount2");
					}
				})
			},
			//获取历史记录
			getHistoryCronyList() {
				var userInfo = uni.getStorageSync("userInfo");
				var historyCronyList = uni.getStorageSync("historyCronyList" + userInfo.id);
				if (historyCronyList != "") {
					if (historyCronyList.messageList.length != 0) {
						this.$store.commit("setMessageList", historyCronyList.messageList);
						this.$store.commit("setMsgCount2", historyCronyList.messageList);
						uni.removeStorageSync("historyCronyList")
					}
				}
				getApp().globalData.getHistoryCronyList = this.getHistoryCronyList;
			},
			//去重
			deWeight(arr) {
				for (var i = 0; i < arr.length - 1; i++) {
					for (var j = i + 1; j < arr.length; j++) {
						if (arr[i].user_id == arr[j].user_id) {
							arr.splice(i, 1);
							//因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
							j--;
						}
					}
				}
				return arr;
			},
			// 重连socket
			reconnect: function() {
				let that = this;
				if (getApp().globalData.wsOnlion) {
					that.reconnFlag = false;
					return;
				}
				that.reConntask = setTimeout(function() {
					that.wsOnlion = false;
					that.initWebScoket(that.url);
				}, 3000);
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
						that.wsOnlion = false;
						console.log("聊天socket关闭成功", res)
					},
					fail(err) {
						console.log("聊天socket关闭失败", err)
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
				}, 10000)
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
				that.socKetUrl = `wss://yaji.ixiaojin.cn/websocket?token=${token}&session_id=${session_id}`;
				getApp().globalData.socketTask = uni.connectSocket({
					url: that.socKetUrl, //仅为示例，并非真实接口地址。
					complete: () => {
						console.log("聊天长连接已建立完成");
						getApp().globalData.wsOnlion = true;
						//添加到离线消息
						that.getUnRead();
					},
				});
				// 监听 WebSocket 连接打开事件
				getApp().globalData.socketTask.onOpen(function(res) {
					console.log('WebSocket连接已打开！');
					that.sendPingPong();
				})
				//监听 WebSocket 接受到服务器的消息事件
				getApp().globalData.socketTask.onMessage((res) => {
					if (JSON.parse(res.data).cate == 2) {
						if (JSON.parse(res.data).type == "add_game_room") {
							var pages = getCurrentPages();
							var page = pages[pages.length - 1];
							if (JSON.parse(res.data).data.list.length >= 6) {
								if (page.route != "pages/joy/poetry") {
									var gameRoomData = that.$store.state.game.gameRoomData;
									console.log(gameRoomData)
									if (gameRoomData.game_room_id != undefined) {
										that.$u.route('pages/joy/poetry?roomId=' + gameRoomData.game_room_id +
											'&roomData=' + res.data);
										that.$store.commit("setGameRoomData", [])
										that.$store.commit("setGameBarFlag", false)
									}
								}
							}
						}
					}
					if (JSON.parse(res.data).cate != 1) {
						return;
					}
					if (JSON.parse(res.data).type == 'text' || JSON.parse(res.data).type == 'image' || JSON.parse(
							res.data).type == 'audio' || JSON.parse(res.data).type == 'gift') {
						console.log(JSON.parse(res.data))
						var userInfo = uni.getStorageSync("userInfo")
						if (that.$store.state.message.receiverId == JSON.parse(res.data).data.user_id) {
							return;
						}
						//别人给我发消息
						if (JSON.parse(res.data).data.user_id != userInfo.id) {
							var messageList = that.$store.state.message.messageList;
							var is_topping = "";
							var topping_time = "";
							var sData = JSON.parse(res.data).data;
							var obj = {};
							var num = 1;
							messageList.forEach((val, index) => {
								if (val.user_id == JSON.parse(res.data).data.user_id) {
									is_topping = val.is_topping;
									topping_time = val.topping_time;
									messageList.splice(index, 1);
									num = ++val.msgNum
								}
							})
							obj.avatar = sData.avatar;
							obj.user_id = sData.user_id;
							obj.role_realname = sData.role_realname;
							obj.role_dynasty = sData.role_dynasty;
							obj.createtime = sData.createtime;
							obj.type = sData.type;
							obj.content = sData.content;
							obj.receiver_id = sData.receiver_id;
							obj.is_topping = is_topping;
							obj.topping_time = topping_time;
							obj.msgNum = num
							messageList.unshift(obj);
							// console.log(messageList)
							// //添加未读数量
							// if (that.$store.state.message.receiverId == "") {
							// 	messageList.forEach((val, index) => {
							// 		if (val.user_id == JSON.parse(res.data).data.user_id) {
							// 			val.msgNum = true;
							// 		}
							// 	})
							// };
							that.$store.commit("setMessageList", messageList);
							that.$store.commit("setMsgCount", messageList);
						} else if (JSON.parse(res.data).data.receiver_id == Number(that.$store.state.message
								.receiverId)) {
							//我给别人发消息		
							//消息列表	
							that.$api('user.profile', {
								user_id: Number(that.$store.state.message.receiverId)
							}).then(data => {
								var newMsgList = that.$store.state.message.messageList;
								var is_topping = "";
								var topping_time = ""
								newMsgList.forEach((val, index) => {
									if (val.user_id == JSON.parse(res.data).data
										.receiver_id) {
										is_topping = val.is_topping;
										topping_time = val.topping_time;
										newMsgList.splice(index, 1);
									} else if (val.receiver_id == JSON.parse(res.data).data
										.receiver_id) {
										newMsgList.splice(index, 1);
									}
								})
								var sData = JSON.parse(res.data).data;
								var obj = {};
								obj.avatar = data.data.avatar;
								obj.user_id = data.data.id;
								obj.role_realname = data.data.role.realname;;
								obj.role_dynasty = data.data.role.dynasty;
								obj.createtime = sData.createtime;
								obj.type = sData.type;
								obj.type = sData.type;
								obj.content = sData.content;
								obj.receiver_id = that.$store.state.message.receiverId;
								obj.msgNum = false;
								obj.is_topping = is_topping;
								obj.topping_time = topping_time;
								newMsgList.unshift(obj);
								that.$store.commit("setMessageList", newMsgList);
							})
						}
					}
				})

				getApp().globalData.socketTask.onClose(function(res) {
					console.log('全局Socket 已关闭！');
					getApp().globalData.wsOnlion = false;
					clearInterval(getApp().globalData.timmer);
					that.initSocket();
				});
				getApp().globalData.socketTask.onError(function() {
					console.log("全局Socket连接打开失败，请检查！");
					that.initSocket()
				})
			},
			async setAppInfo() {
				let that = this;
				let platform = '';
				return new Promise((resolve, reject) => {
					uni.getSystemInfo({
						success: function(e) {
							Vue.prototype.StatusBar = e.statusBarHeight;
							// #ifdef H5
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
							if (that.$wxsdk.isWechat()) {
								platform = 'wxOfficialAccount';
							} else {
								platform = 'H5';
							}
							// #endif

							// #ifdef APP-PLUS
							platform = 'App';
							if (e.platform == 'android') {
								uni.setStorageSync('isAndroid', true);
								Vue.prototype.CustomBar = e.statusBarHeight + 50;
							} else {
								Vue.prototype.CustomBar = e.statusBarHeight + 45;
								uni.setStorageSync('isAndroid', false);
							}
							// #endif

							// #ifdef MP-WEIXIN
							platform = 'wxMiniProgram';
							new Wechat().getWxMiniProgramSessionKey();
							let custom = wx.getMenuButtonBoundingClientRect();
							Vue.prototype.Custom = custom;
							Vue.prototype.CustomBar = custom.bottom + custom.top - e
								.statusBarHeight;
							// #endif
							uni.setStorageSync('platform', platform);
							resolve(platform);
						}
					});
				});
			},
			async autoLogin(data) {
				let initData = data;
				let wechat = new Wechat();
				// #ifdef MP-WEIXIN
				wechat.checkMiniProgramUpdate();
				// #endif
				// #ifdef H5
				uni.setStorageSync('appid', initData.wechat.appid);
				// #endif
			},
			// requestAn() {
			// 	switch (uni.getSystemInfoSync().platform) {
			// 		case 'android':
			// 			permision.requestAndroidPermission("android.permission.RECORD_AUDIO")
			// 			break;
			// 		case 'ios':
			// 			permision.judgeIosPermission("record")
			// 			break;
			// 	}

			// }

		},
		// onLaunch(options) {
		//     // 判断是否是第一次启动应用
		//     if (!options.query || !options.query.scene) {
		//       // 如果是第一次启动应用，则跳转到指定页面
		//       uni.navigateTo({
		//         url: '/pages/auth/login'
		//       })
		//     }
		//   },
		// onLaunch: async function(options) {
		// 	await this.setAppInfo();
		// 	try {
		// 		let init = await this.getAppInit(options);
		// 		await this.autoLogin(init.data);
		// 		if (process.env.NODE_ENV === 'development') {
		// 			await this.getRoutes();
		// 		}
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// },
		onShow() {
			this.getHistoryCronyList();
		},
		onLaunch: async function() {
			this.initSocket();
			this.isLogin()
			this.renew()
			this.pushMsg();
			let token = Boolean(uni.getStorageSync('token'))
			let that = this;
			that.$api('user.info').then(res => {
				var skip = uni.getStorageSync("skip");
				var usreInfo = uni.getStorageSync("userInfo")
				if (skip == usreInfo.id) {
					uni.reLaunch({
						url: '/pages/index/index',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
					return;
				}
				if (token && res.data.gender == 0) {
					uni.reLaunch({
						url: '/pages/auth/s1',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				if (!Boolean(res.data.realname) && !Boolean(res.data.dynasty) && res.data.gender != 0 && res
					.data.choose_num != 4) {
					console.log('cs', res.data.choose_num);
					uni.reLaunch({
						url: '/pages/index/index',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				if (!Boolean(res.data.realname) && !Boolean(res.data.dynasty) && res.data.gender != 0) {
					uni.reLaunch({
						url: '/pages/auth/s2',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				// 如果没角色有性别的话 跳到角色页面
				if (!Boolean(res.data.realname) && !Boolean(res.data.dynasty) && res.data.gender != 0 && res
					.data.choose_num == 4) {
					console.log('cs', res.data.choose_num);
					uni.reLaunch({
						url: '/pages/auth/s2',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				//如果有角色有性别的话  就跳到首页
				if (Boolean(res.data.realname) && Boolean(res.data.dynasty) && res.data.gender != 0) {
					uni.reLaunch({
						url: '/pages/index/index',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				//如果有性别的话就跳到角色
				else if (res.data.gender != 0) {
					uni.reLaunch({
						url: '/pages/auth/s2',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				} else {
					uni.reLaunch({
						url: '/pages/auth/s1',
						success: (res) => {},
						fail: (err) => {
							console.log(err);
						}
					})
				}
			})

		},
		onHide: function() {
			var that = this;
			var userInfo = uni.getStorageSync("userInfo");
			if (!userInfo) {
				return;
			}
			//聊天记录添加到storage
			if (that.$store.state.message.messageList.length != 0) {
				var list = that.$store.state.message.messageList;
				list.forEach((val, index) => {
					if (val.user_id == undefined) {
						list.splice(index, 1)
					}
				})
				var obj = {
					id: userInfo.id,
					messageList: list
				}
				uni.setStorageSync("historyCronyList" + userInfo.id, obj)
			}
			// // -----------------
			if (getApp().globalData.isSelectImage) {
				return;
			}
		},
	};
</script>

<style lang="scss">
	// @import 'static/style/color.scss';
	// @import 'static/style/main.scss';
	@import "static/tailwindcss/tailwind.css";
	@import 'static/remixicon/remixicon.css';
	@import 'static/iconfont/icons.css';

	page {
		font-family: Monospaced Number, Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif !important;
	}
</style>