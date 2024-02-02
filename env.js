uni.request({
	url: "https://yaji.ixiaojin.cn/api/hey/index/config",
	method: "GET",
	success(res) {
		if (res.data.code == 1) {
			res.data.data = {
				"host": "https://yaji.ixiaojin.cn/",
				"socket": "wss://yaji.ixiaojin.cn/websocket",
			};
			uni.setStorageSync("hostData", res.data.data)
		}
	}
})
// export const API_URL = 'https://yaji.ixiaojin.cn/api/hey/'; //测试
// export const API_URL = 'https://yaji.suoeryoude.cn/api/hey/'; //正式