import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import init from './modules/init.js'
import user from './modules/user.js'
import audio from '@/store/modules/audio.js';
import common from '@/store/modules/common.js';


const modules = {
	init,
	user,
	audio,
	common
}
const store = new Vuex.Store({
	modules,

})

export default store
