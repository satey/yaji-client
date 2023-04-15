import api from '@/common/request/index'
import {
	INIT_DATA,
	PAGE_ROUTES
} from '../types.js'
const state = {
	initData: {},
	routes:[]
}

const actions = {
	getAppInit({
		commit
	}, options) {
		let params = {}
		uni.setStorageSync('mode', 'product');
		if(options.query.preview_id) {
			uni.setStorageSync('mode', 'preview');
			params.preview_id = options.query.preview_id;
		}
		return new Promise((resolve, reject) => {
			api('index.init', params).then(res => {
				commit('INIT_DATA', res.data);
				uni.setStorageSync('sysInfo', res.data);
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		})
	},
	getRoutes({
		commit
	}) {
		return new Promise((resolve, reject) => {
			api('index.asyncLink',{
				data:ROUTES
			}).then(res => {
				commit('PAGE_ROUTES', res.data);
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		})
	},
}

const mutations = {
	[PAGE_ROUTES](state, data) {
		state.routes = data
	},
	[INIT_DATA](state, data) {
		state.initData = data
	},
}

const getters = {

}

export default {
	state,
	mutations,
	actions,
	getters
}
