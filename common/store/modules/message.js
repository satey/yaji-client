export default {
	state: {
		messageList: [], //消息列表
		toppingList: [], //置顶消息列表
		messageCount: 0, //总消息数量
	},
	mutations: {

		//设置消息列表
		setMessageList(state, arr) {
			state.messageList = arr;
		},
		//初始化底部角标
		initMsgCount(state, num) {
			state.messageCount = num;
			if (num == 0) {
				uni.removeTabBarBadge({
					index: 3
				})
			} else {
				uni.setTabBarBadge({
					index: 3,
					text: `${num}`
				})
			}
		},
		//设置底部角标数量
		setMsgCount(state, num) {
			state.messageCount = state.messageCount - num;
			if (state.messageCount == 0) {
				uni.removeTabBarBadge({
					index: 3
				})
			} else {
				uni.setTabBarBadge({
					index: 3,
					text: `${state.messageCount}`
				})
			}
		},
		//设置列表上的未读
		setMessageListCount(state, item) {
			state.messageList.data.forEach((items, index) => {
				if (item.user_id == items.user_id) {
					if (item.no_read_count != 0) {
						state.messageList.data[index].no_read_count = state.messageList.data[index]
							.no_read_count - item
							.no_read_count;
					}
				}
			})
		}
	},
	getters: {

	}
}