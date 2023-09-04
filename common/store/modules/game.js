export default {
	state: {
		mateId: "",
		gameBarFlag: false,
		gameRoomData: []
	},
	mutations: {
		setMateId(state, id) {
			state.mateId = id;
		},
		setGameBarFlag(state, bool) {
			state.gameBarFlag = bool;
		},
		setGameRoomData(state, arr) {
			state.gameRoomData = arr;
		}
	},
	getters: {

	}
}