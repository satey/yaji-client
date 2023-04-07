import api from '@/common/request/index'
import store from '@/common/store'
import router from '@/common/router'
import {
	API_URL
} from '@/env'

export default class Wechat {
	async login() {
		let token = '';
		// #ifdef MP-WEIXIN
		token = await this.wxMiniProgramLogin();
		return token;
		// #endif
		// #ifdef H5
		this.wxOfficialAccountLogin();
		// #endif
		// #ifdef APP-PLUS
		token = await this.wxOpenPlatformLogin();
		return token;
		// #endif
	}
	// #ifdef H5

	wxOfficialAccountLogin() {
		let oUrl = window.location.href;
		window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + store.state.init.initData.wechat.appid +
			`&redirect_uri=${API_URL}user/wxOfficialAccountLogin&response_type=code&scope=snsapi_userinfo&state=` +
			oUrl;
		throw 'stop';
	}
	//临时登录获取OpenId 不入库不绑定用户

	wxOfficialAccountBaseLogin() {
		let oUrl = window.location.href;
		//首次进入 没有登录 保存
		window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + store.state.init.initData.wechat.appid +
			`&redirect_uri=${API_URL}user/wxOfficialAccountBaseLogin&response_type=code&scope=snsapi_base&state=` +
			oUrl;
		throw 'stop';
	}
	// #endif

	wxOpenPlatformLogin() {
		let that = this;
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					if (loginRes.errMsg === "login:ok") {
						let authResult = loginRes.authResult;
						uni.getUserInfo({
							provider: 'weixin',
							success: function (infoRes) {
								if (infoRes.errMsg === "getUserInfo:ok") {
									let userInfo = infoRes.userInfo;
									api('user.wxOpenPlatformLogin', {
										authResult: authResult,
										userInfo: userInfo
									}).then(res => {
										if (res.code === 1) {
											resolve(res.data.token);
										}
									});
								}
							},
							fail: function (res) {}
						});
					}
				},
				fail: function (res) {}
			});
		});
	}

	// #ifdef MP-WEIXIN
	getWxMiniProgramSessionKey() {
		let that = this;
		let sessionStatus = false;
		let session_key = '';
		return new Promise((resolve, reject) => {
			uni.checkSession({
				success(res) {
					if (res.errMsg === 'checkSession:ok') sessionStatus = true;
				},
				complete() {
					if (!uni.getStorageSync('session_key') || !sessionStatus) {
						uni.login({
							success: function (info) {
								let code = info.code;
								api('user.getWxMiniProgramSessionKey', {
									code: code,
								}).then(res => {
									if (res.code === 1) {
										uni.setStorageSync('session_key', res.data.session_key);
										uni.setStorageSync('openid', res.data.openid);
										session_key = res.data.session_key;
									}
								});
							}
						});
					} else {
						session_key = uni.getStorageSync('session_key');
					}
				}
			})

			resolve(session_key);

		});
	}

	wxMiniProgramLogin(e) {
		let that = this;
		return new Promise((resolve, reject) => {
			uni.login({
				success: function(info) {
					let code = info.code;
					api('user.wxMiniProgramLogin', {
						code: code,
						invite_id: uni.getStorageSync('inviterId')
					}).then(res => {
						if (res.code === 1) {
							resolve(res.data.token);
						}
					});
				}
			});
		});
	}

	// 小程序更新
	checkMiniProgramUpdate() {
		if (uni.canIUse('getUpdateManager')) {
			const updateManager = uni.getUpdateManager()
			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								console.log('success====', res)
								// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						uni.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						})
					})
				}
			})
		}
	}
	// #endif


}
