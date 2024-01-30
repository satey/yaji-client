// export const API_URL = 'https://yaji.shuchuang.net/api/hey/';
uni.request({
	url: "https://yaji.ixiaojin.cn/api/hey/index/config",
	method: "GET",
	success(res) {
		if (res.data.code == 1) {
			uni.setStorageSync("hostData", res.data.data)
		}
	}
})
// export const API_URL = 'https://yaji.ixiaojin.cn/api/hey/'; //测试
// export const API_URL = 'https://yaji.suoeryoude.cn/api/hey/'; //正式