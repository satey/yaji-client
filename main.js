import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import tools from '@/common/utils/tools'
import { API_URL } from '@/env';

import uView from 'uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

import { RouterMount } from 'uni-simple-router'
import api from '@/common/request/index'

// 防止多次点击
import common from './common/common.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;


Vue.prototype.$API_URL = API_URL;
Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
	store,
	...App
});

// #ifdef H5
import wxsdk from '@/common/wechat/sdk'
Vue.prototype.$wxsdk = wxsdk;
RouterMount(app, '#app');
// #endif
// #ifndef H5
app.$mount();
// #endif
