const db = uniCloud.database()
const uniID = require('uni-id-common')

module.exports = {
	_before: function() { // 通用预处理器：在 _before 里定义的所有变量都在下面方法内通用
		const clientInfo = this.getClientInfo() // 获取客户端信息
		this.uniID = uniID.createInstance({ // 创建uni-id实例
			clientInfo
		})
	},
	async add(data) {
		const token = this.getUniIdToken() // 获取客户端的 token

		// checkToken 是异步的，通过 uni-id 实例来调用，用于对 token 解包
		let userInfo = await this.uniID.checkToken(token)

		data.user_id = userInfo.uid // 从解包的 token 中拿到 uid
		data.time = Date.now()

		if (data.selected) { // 若新增地址时，勾选了设为默认地址
			await db.collection('qy-mall-address').where({
				user_id: userInfo.uid // 必须匹配 uid，不能改错用户
			}).update({
				selected: false // 把该用户下的其他地址取消默认
			})
		}
		return await db.collection('qy-mall-address').add(data)
	},
}