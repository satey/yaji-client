export default {
	state: {
		mateId:"",
		gameBarFlag: false,
	},
	mutations: {
		setMateId(state,id){
			state.mateId = id;
		},
		setGameBarFlag(state, bool) {
			state.gameBarFlag = bool;
		}
	},
	getters: {

	}
}