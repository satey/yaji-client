export default {
	state: {
		isRenew: false, //弹窗
		renewContent: "", //更新内容
		downloadUrl: "", //下载url
		isEnforce: "", //强制更新
	},
	mutations: {
		//设置弹出框
		setisRenew(state, flag) {
			state.isRenew = flag
		},
		setRenewContent(state, text) {
			state.renewContent = text
		},
		setDownloadUrl(state, url) {
			state.downloadUrl = url;
		},
		setisEnforce(state, num) {
			state.isEnforce = num
		}
	},
	actions: {

	}
}