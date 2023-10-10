const getters = {
	statusBarHeight: state => state.system.statusBarHeight,
	titleBarHeight: state => state.system.titleBarHeight,
	foldState: state => state.system.foldState,
	totalHeight: state => {
		if (state.system.foldState) return state.system.statusBarHeight + state.system.titleBarHeight + 10
		return state.system.statusBarHeight + state.system.titleBarHeight + 100 + 10
	},
	bodyBarHeight: state => {
		if (state.system.foldState) return state.system.titleBarHeight
		return 100
	},

}
export default getters