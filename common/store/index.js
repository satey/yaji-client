import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import init from './modules/init.js'
import user from './modules/user.js'

const modules = {
	init,
	user,
}
const store = new Vuex.Store({
	modules
})

export default store
