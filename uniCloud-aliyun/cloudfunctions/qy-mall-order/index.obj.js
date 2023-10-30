const db = uniCloud.database()
const selfUtils = require('self-utils') // 导入 selfUtils 自定义模块
module.exports = {
	_before: async function() { // 通用预处理器
		// 使用 selfUtils 自定义模块获取客户端用户信息
		this.userInfo = await selfUtils.getUserInfo(this)

		// 若 token 错误，向外抛出 checkToken 校验失败的原因，uni-id 会截取
		if (!this.userInfo.uid) throw this.userInfo;
	},
	async createOrder(data) {
		let order_no = getOrderId()
		data.order_no = order_no
		data.user_id = this.userInfo.uid
		
		await db.collection('qy-mall-order').add(data)
		return order_no
	},
}

// 生成订单号
function getOrderId() {
	return Date.now() + '_' + String(Math.random()).substring(3, 9)
}