const db = uniCloud.database()
const cmd = db.command

module.exports = {
	_before: function() { // 通用预处理器
		this.params = this.getParams()[0] // 包含_id
	},
	async get() {
		return await db.collection('qy-mall-sku').get()
	},
	async add() {
		this.params.checked = false
		return await db.collection('qy-mall-sku').add(this.params) // add成功会返回 id
	},
	async updateChild(_id, obj) {
		obj.checked = false
		return await db.collection('qy-mall-sku').doc(_id).update({
			children: cmd.push([obj])
		})
	}
}