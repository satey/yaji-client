export default {
	state: {
		messageList: [], //消息列表
		messageCount: 0, //总消息数量
		receiverId: "",
		messageListTotal: [], //全部消息列表
		islogout: false,
		topMessageList: [], //置顶消息
		historyMsgList: [],
	},
	mutations: {
		//设置登录状态
		setIslogout(state, bol) {
			state.islogout = bol
		},
		//设置消息列表
		setMessageList(state, arr) {
			state.messageList = arr;
			var userInfo = uni.getStorageSync("userInfo");
			if (!userInfo) {
				return;
			}
			if (state.messageList.length != 0) {
				var obj = {
					id: userInfo.id,
					messageList: state.messageList
				}
				uni.setStorageSync("historyCronyList" + userInfo.id, obj)
			}
		},
		//设置底部角标
		setMsgCount(state, arr) {
			var num = 0;
			for (var i = 0; i < arr.length; i++) {
				num += state.messageList[i].msgNum;
				console.log(state.messageCount)
				// if (arr[i].msgNum != undefined) {
				// 	if (arr[i].msgNum == true) {
				// 		state.messageCount = true;
				// 		break;
				// 	}
				// }
			}
			state.messageCount = num
		},
		//设置各个列表的角标
		setMsgCount2(state) {
			if (state.messageList.length == 0) {
				state.messageCount = 0;
				return;
			}
			var num = 0;
			for (var i = 0; i < state.messageList.length; i++) {
				if (state.messageList[i].msgNum != undefined) {
					num += state.messageList[i].msgNum;
					// if (state.messageList[i].msgNum == true) {
					// 	state.messageCount = true;
					// 	break;
					// } else {
					// 	state.messageCount = false;
					// }
				}
			}
			state.messageCount = num
			var userInfo = uni.getStorageSync("userInfo");
			if (!userInfo) {
				return;
			}
			if (state.messageList.length != 0) {
				var arr = [];
				state.messageList.forEach((val, index) => {
					if (val.user_id != undefined) {
						arr.push(val)
					}
				})
				var obj = {
					id: userInfo.id,
					messageList: arr
				}
				uni.setStorageSync("historyCronyList" + userInfo.id, obj)
			}
		},
		//清楚消息红点
		setMessageListCount(state, id) {
			var arr = state.messageList;
			arr.forEach((item, index) => {
				if (arr[index].user_id == id) {
					arr[index].msgNum = 0;
				}
			})
			state.messageList = arr;
		},
		//设置接收人id
		setReceiverId(state, id) {
			state.receiverId = id;
		},
		//设置全部消息列表
		messageListTotal(state, arr) {
			state.messageListTotal = arr;
		},
		setMessageListTotal(state, rid) {
			for (var i = 0; i < state.messageListTotal.length; i++) {
				if (state.messageListTotal[i].data.user_id == rid) {
					state.messageListTotal.splice(i, 1);
					i--;
				}
			}
		},
		//添加未读消息
		appendUnRead(state, arr) {
			state.messageList = arr
		},
		//用户聊天记录
		setHistoryMsgList(state, arr) {
			state.historyMsgList = arr;
		},
	},
	getters: {

	}
}