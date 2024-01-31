export default {
	state: {
		showHif: false,
		qslsTaskData: [],
		qslsCupType: '3',
		roomId: "",
	},
	mutations: {
		setShowHif(state, isShow) {
			state.showHif = isShow;
		},
		setQslsTaskData(state, arr) {
			state.qslsTaskData = arr;
		},
		setQslsCupType(state, type) {
			state.qslsCupType = type;
		},
		setRoomId(state, roomId) {
			state.roomId = roomId
		}
	},
	getters: {

	}
}