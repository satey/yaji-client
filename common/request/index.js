import Request from './request'
import apiList from './api'
import store from '@/common/store/index.js'

export default function api(url, data = {}) {
	const request = new Request();
	let api = getApiObj(url);
	request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
		if (api.auth) {
			let token = uni.getStorageSync('token');
			if (!token) {
				cancel('token 不存在');
				store.commit('LOGIN_TIP', true)
			}
		}
		config.header.token = uni.getStorageSync('token');
		return config
	});

	request.interceptor.response((response) => {
		if (response.data.code === 0) {
			// uni.showToast({
			// 	title: response.data.msg || '请求出错,稍后重试',
			// 	icon: 'none',
			// 	duration: 1000,
			// 	mask: true
			// });
		}
		if (response.data.code === 401) {
			uni.removeStorageSync('token');
			store.commit('LOGIN_TIP', true)
		}
		return response
	}, (response) => {
		return response
	})

	return request.request({
		url: api.url,
		data,
		method: api.method
	})
}

function getApiObj(url) {
	let arr = url.split(".");
	let api = apiList;
	arr.forEach(v => {
		api = api[v];
	});
	return api;
}
