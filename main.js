import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import tools from '@/common/utils/tools'
import {
	API_URL
} from '@/env';
import uView from 'uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

import {
	RouterMount
} from 'uni-simple-router'
import api from '@/common/request/index'
import TRTC from "@/TRTC/TRTC.js"
import topPrompt from "@/components/fei-topPrompt/fei-topPrompt.vue"
import qslsHit from "@/components/fei-qslsHit/fei-qslsHit.vue"
import authority from "@/components/fei-authority/fei-authority.vue"
Vue.component("topPrompt", topPrompt)
Vue.component("feiqslsHit", qslsHit)
Vue.component("feiauthority", authority)
// 防止多次点击
import common from './common/common.js'
// import cos from "@/dist/cos.js"
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;
Vue.prototype.$TRTC = TRTC;


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