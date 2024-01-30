import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import init from './modules/init.js'
import user from './modules/user.js'
import audio from '@/store/modules/audio.js';
import common from '@/store/modules/common.js';
import message from '@/common/store/modules/message.js';
import game from '@/common/store/modules/game.js';
import qsls from '@/common/store/modules/qsls.js';


const modules = {
	init,
	user,
	audio,
	common,
	message,
	game,
	qsls
}
const store = new Vuex.Store({
	modules,

})

export default store