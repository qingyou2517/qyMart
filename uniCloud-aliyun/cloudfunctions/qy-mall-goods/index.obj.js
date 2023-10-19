const db = uniCloud.database()
module.exports = {
	_before: function() { // 通用预处理器

	},

	async getOne(id) {
		let res = await db.collection('qy-mall-goods').doc(id).get()
		res.data[0].price = res.data[0].price / 100
		res.data[0].before_price = res.data[0].before_price ? res.data[0].before_price / 100 : null
		return res
	},

	async update(params) {
		let _params = { // 深拷贝
			...params
		}
		delete _params._id
		_params.price = Number(_params.price).toFixed(2) * 100 // 数据库价格是以 "分" 为单位
		_params.before_price = _params.before_price ? Number(_params.before_price).toFixed(2) * 100 : null
		return await db.collection('qy-mall-goods').doc(params._id).update(_params)
	},

	async add(params) {
		params.price = Number(params.price).toFixed(2) * 100 // 数据库价格是以 "分" 为单位
		params.before_price = params.before_price ? Number(params.before_price).toFixed(2) * 100 : null
		return await db.collection('qy-mall-goods').add(params)
	},

	async getList() {
		let navData = await db.collection('qy-mall-categories').get()
		let goods = await db.collection('qy-mall-goods').get()

		// 从前端可以知道，get() 返回的对象有个 data 属性，是我们想要的数组列表
		navData.data.forEach(item => {
			let proGroup = goods.data.filter(g => {
				return item._id === g.category_id
			})
			item.proGroup = proGroup
		})
		let newArr = navData.data.filter(item => {
			return item.proGroup.length
		})
		return {
			data: newArr
		}
	},

	async remove(id) {
		let res = await db.collection('qy-mall-goods').doc(id).remove()
		return res
	},
}