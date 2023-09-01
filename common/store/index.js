import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import init from './modules/init.js'
import user from './modules/user.js'
import audio from '@/store/modules/audio.js';
import common from '@/store/modules/common.js';
import message from '@/common/store/modules/message.js';
import renew from '@/common/store/modules/renew.js';
import game from '@/common/store/modules/game.js';


const modules = {
	init,
	user,
	audio,
	common,
	message,
	renew,
	game
}
const store = new Vuex.Store({
	modules,

})

export default store