const uniID = require('uni-id-common')

const getUserInfo = async function(_this) {
	const clientInfo = _this.getClientInfo() // 获取客户端信息
	uniIDIns = uniID.createInstance({ // 创建uni-id实例
		clientInfo
	})
	const token = _this.getUniIdToken() // 获取客户端的 token

	// checkToken 是异步的，通过 uni-id 实例来调用，用于对 token 解包
	let userInfo = await uniIDIns.checkToken(token)
	return userInfo
}

module.exports = {
	getUserInfo,
}