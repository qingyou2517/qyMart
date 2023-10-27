const cars = {
	state: {
		carsList: []
	},
	mutations: {
		setCarsList(state, params = null) {
			if (!params) {
				return state.carsList = []
			}
			let {
				item,
				num
			} = params
			let caritem = { // 一个新商品
				goodsid: item._id || item.goodsid,
				numValue: num,
				name: item.name,
				price: item.price,
				before_price: item.before_price,
				thumb: item.thumb,
				skuArr: item.skuArr || null, // 商品的所选规格
				add: item.add || false, // 标记所使用的步进器的来源
			}
			// 判断新加入的商品 是否为 购物车内的已有商品，是否为新规格
			let idx = state.carsList.findIndex((car) => {
				if (car.skuArr) {
					// 比较两个数组是否相同：可以先排序，再转为字符串，然后进行比较
					return car.goodsid === caritem.goodsid && JSON.stringify(car.skuArr.sort()) === JSON
						.stringify(caritem.skuArr.sort())
				} else {
					return car.goodsid === caritem.goodsid
				}
			})
			// idx=-1表示购物车内无该商品，或者有该商品但是所选规格不同
			if (idx < 0) {
				state.carsList.unshift(caritem)
			} else {
				// dix>=0表示购物车内有该商品，且所选规格相同/压根没有规格可选
				if (caritem.add) {
					// 若使用的是规格弹窗内的步进器添加商品数量
					state.carsList[idx].numValue += caritem.numValue
				} else {
					// 若使用的是步进器组件来添加商品数量
					state.carsList[idx].numValue = caritem.numValue
				}
				if (state.carsList[idx].numValue <= 0) state.carsList.splice(idx, 1)
			}
		}
	},
	actions: {

	},
}
export default cars