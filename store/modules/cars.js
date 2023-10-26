const cars = {
	state: {
		carsList: []
	},
	mutations: {
		setCarsList(state, params) {
			let {
				item,
				num
			} = params
			let caritem = {
				goodsid: item._id || item.goodsid,
				numValue: num,
				name: item.name,
				price: item.price,
				before_price: item.before_price,
				thumb: item.thumb
			}
			let idx = state.carsList.findIndex((car) => {
				return car.goodsid === caritem.goodsid
			})
			if (idx < 0) {
				state.carsList.unshift(caritem)
			} else {
				state.carsList[idx].numValue = caritem.numValue
				if (state.carsList[idx].numValue <= 0) state.carsList.splice(idx, 1)
			}
		}
	},
	actions: {

	},
}
export default cars