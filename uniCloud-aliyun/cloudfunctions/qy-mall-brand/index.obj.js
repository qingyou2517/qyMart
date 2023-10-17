const db = uniCloud.database() // 关联数据库

module.exports = {
	_before: function() { // 通用预处理器
		this.params = this.getParams()[0]
	},
	async get(){
		return await db.collection('qy-mall-brand').get()
	},
	async add() {
		return await db.collection('qy-mall-brand').add(this.params)
	},
	async update() {
		let params = {...this.params}
		delete params._id
		return await db.collection('qy-mall-brand').doc(this.params._id).update(params)
	},
}