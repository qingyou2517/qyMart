const db = uniCloud.database()
const selfUtils = require('self-utils') // 导入 selfUtils 自定义模块

module.exports = {
	_before: async function() { // 通用预处理器：在 _before 里定义的所有变量都在下面方法内通用
		this.userInfo = await selfUtils.getUserInfo(this) // 使用 selfUtils 自定义模块

	},
	async add(data) {
		if (!this.userInfo.uid) return this.userInfo

		let userInfo = await selfUtils.getUserInfo(this) // 使用 selfUtils 自定义模块

		data.user_id = this.userInfo.uid // 从解包的 token 中拿到 uid
		data.time = Date.now()

		if (data.selected) { // 若新增地址时，勾选了设为默认地址
			await db.collection('qy-mall-address').where({
				user_id: this.userInfo.uid // 必须匹配 uid，不能改错用户
			}).update({
				selected: false // 把该用户下的其他地址取消默认
			})
		}
		return await db.collection('qy-mall-address').add(data)
	},
}