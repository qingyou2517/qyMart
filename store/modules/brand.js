const brandCloudObj = uniCloud.importObject('qy-mall-brand')

const brand = {
	state: {
		brandData: {},
	},
	mutations: {
		setBrand(state, value) {
			state.brandData = value
		}
	},
	actions: {
		async getBrandData(context) {
			let keysArr = Object.keys(context.state.brandData)
			if (keysArr.length) return; // 若 brandData 不是空对象，就不用执行下面的异步操作

			let res = await brandCloudObj.get()
			context.commit("setBrand", res.data[0])
		}
	},
}

export default brand