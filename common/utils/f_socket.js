import store from '@/common/store'
import Vue from 'vue'
var socketTask = null;

function initSocket() {
	var that = this;
	var token = uni.getStorageSync('token');
	var session_id = uni.getStorageSync('CHATSESSIONID');
	if (token == '') {
		return;
	}
	that.socKetUrl = `wss://yaji.ixiaojin.cn/websocket?token=${token}&session_id=${session_id}`;
	socketTask = uni.connectSocket({
		url: that.socKetUrl, //仅为示例，并非真实接口地址。
		complete: () => {
			console.log("聊天长连接已建立完成");
			getApp().globalData.wsOnlion = true;
		},
	});
	// 监听 WebSocket 连接打开事件
	socketTask.onOpen(function(res) {
		console.log('WebSocket连接已打开！');
		sendPingPong();
	})
	//监听 WebSocket 接受到服务器的消息事件
	socketTask.onMessage((res) => {
		if (JSON.parse(res.data).type == 'text' || JSON.parse(res.data).type == 'image' || JSON.parse(
				res.data).type == 'audio') {
			console.log(JSON.parse(res.data))
			var userInfo = uni.getStorageSync("userInfo")
			if (JSON.parse(res.data).data.user.id != userInfo.id) {
				var messageList = store.state.message.messageList;
				messageList.forEach((val, index) => {
					if (val.data.user.id == JSON.parse(res.data).data.user.id) {
						messageList.splice(index, 1);
					}
				})
				//总列表判断
				if (store.state.message.receiverId == "") {
					var msgNum = 0;
					var messageListTotal = store.state.message.messageListTotal;
					messageListTotal.push(JSON.parse(res.data));
					console.log(messageListTotal)
					console.log("fei")
					messageListTotal.forEach((val, index) => {
						if (val.data.user_id == JSON.parse(res.data).data.user.id) {
							msgNum++
						}
					})
					store.commit("messageListTotal", messageListTotal)
				}
				//添加数据
				messageList.unshift(JSON.parse(res.data));
				//添加未读数量
				if (store.state.message.receiverId == "") {
					messageList.forEach((val, index) => {
						if (val.data.user_id == JSON.parse(res.data).data.user.id) {
							val.data.msgNum = msgNum;
						}
					})
				};
				// --------
				store.commit("setMessageList", messageList);
				store.commit("setMsgCount", messageList);
			} else if (JSON.parse(res.data).data.receiver_id == Number(store.state.message
					.receiverId)) {
				//消息列表	
				Vue.prototype.$api('user.profile', {
					user_id: Number(store.state.message.receiverId)
				}).then(data => {
					var newMsgList = store.state.message.messageList;
					newMsgList.forEach((val, index) => {
						if (val.data.user_id == JSON.parse(res.data).data
							.receiver_id) {
							newMsgList.splice(index, 1);
						} else if (val.data.receiver_id == JSON.parse(res.data).data
							.receiver_id) {
							newMsgList.splice(index, 1);
						}
					})
					var obj = JSON.parse(res.data);
					obj.data.user.avatar = data.data.avatar;
					obj.data.receiver_id = data.data.id;
					obj.data.user.role_realname = data.data.role.realname;
					obj.data.user.role_dynasty = data.data.role.dynasty;
					obj.data.user.id = data.data.id;
					newMsgList.unshift(obj);
					store.commit("setMessageList", newMsgList);
				})
			}
		}
	})

	socketTask.onClose(function(res) {
		console.log('全局Socket 已关闭！');
		getApp().globalData.wsOnlion = false;
		clearInterval(getApp().globalData.timmer);
		if (!getApp().globalData.islogout) {
			initSocket();
		}
	});
	socketTask.onError(function() {
		console.log("全局Socket连接打开失败，请检查！");
	})
}
//关闭socker
function socketClose() {
	socketTask.close()
	socketTask = null
}
//发送信息
function socketSend(data) {

}

function sendPingPong() {
	let that = this;
	getApp().globalData.timmer = setInterval(function() {
		if (getApp().globalData.wsOnlion == true) {
			let obj = {
				type: 'ping'
			};
			let objStr = JSON.stringify(obj);
			socketTask.send({
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
}
export default {
	initSocket,
	socketClose
}