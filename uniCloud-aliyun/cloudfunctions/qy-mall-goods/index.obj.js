const db = uniCloud.database()
module.exports = {
	_before: function() { // 通用预处理器

	},
	async add(params) {
		params.price = Number(params.price).toFixed(2) * 100 // 数据库价格是以 "分" 为单位
		params.before_price = params.before_price ? Number(params.before_price).toFixed(2) * 100 : null
		return await db.collection('qy-mall-goods').add(params)
	},
}