const goods = {
	state: {
		detailPopState: false, // 商品详情弹出层的开启和关闭
		detailData: {}, // 商品详情弹出层的数据
		proSpecsState: false, //规格详情弹出层的开启和关闭
	},
	mutations: {
		setDetailState(state, value) {
			state.detailPopState = value
		},
		setDetailData(state, value) {
			value.description = value.description.replace(/\n/g, "<br>")
			state.detailData = value
		},
		setProSpecsState(state, value) {
			state.proSpecsState = value
		},
	},
	actions: {

	}
}

export default goods