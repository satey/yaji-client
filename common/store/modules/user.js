// 用户数据模块
import api from '@/common/request/index'
import store from '@/common/store'
import router from '@/common/router.js'
import Vue from 'vue'
import {
	USER_INFO,
	LOGIN_TIP,
	// ORDER_NUMBER,
	OUT_LOGIN
} from '../types.js'
const state = {
	userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
	showLoginTip: false,
	// orderNum: {}
}

const actions = {
	getUserInfo({
		commit
	}) {
		var that = this;
		return new Promise((resolve, reject) => {
			api('user.info').then(res => {
				var that = this;
				commit('USER_INFO', res.data);
				uni.setStorageSync('userInfo', res.data);
				commit('LOGIN_TIP', false);
				resolve(res)

			}).catch(e => {
				reject(e)
			})
		})
	},
}

const mutations = {
	[USER_INFO](state, data) {
		state.userInfo = data
	},
	[LOGIN_TIP](state, data) {
		state.showLoginTip = data
	},
	// [ORDER_NUMBER](state, data) {
	// 	state.orderNum = data
	// },
	[OUT_LOGIN](state, data) {
		uni.removeStorageSync('token');
		uni.removeStorageSync('userInfo');
		store.commit('USER_INFO', {});
		// store.commit('CART_LIST', []);
		// store.commit('CART_NUM', '0');
		// store.commit('ORDER_NUMBER', 0);
		router.replace('/pages/index/index');
	},
}

const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}