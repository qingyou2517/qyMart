const systemInfo = uni.getSystemInfoSync();

// 获取状态栏高度
const getStatusBarHeight = () => systemInfo.statusBarHeight || 20;

// 获取标题栏高度
const getTitleBarHeight = () => {
	// #ifdef MP-WEIXIN
	// 计算胶囊按钮所在父盒子的高度
	let menuBtnInfo = uni.getMenuButtonBoundingClientRect();
	return menuBtnInfo.height + (menuBtnInfo.top - getStatusBarHeight()) * 2
	// #endif

	// #ifndef MP-WEIXIN
	return 40
	// #endif
}


const system = {
	state: {
		statusBarHeight: getStatusBarHeight(),
		titleBarHeight: getTitleBarHeight(),
		foldState: false,
	},
	mutations: {
		setFoldState(state, value) {
			state.foldState = value
		}
	},
	actions: {

	},
}
export default system