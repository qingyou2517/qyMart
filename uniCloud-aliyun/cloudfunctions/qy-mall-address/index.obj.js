const db = uniCloud.database()
const selfUtils = require('self-utils') // 导入 selfUtils 自定义模块

module.exports = {
	_before: async function() { // 通用预处理器：在 _before 里定义的所有变量都在下面方法内通用
		this.userInfo = await selfUtils.getUserInfo(this) // 使用 selfUtils 自定义模块

	},
	async add(data) {
		// 若 token 错误，返回 checkToken 校验失败的原因，uni-id 会截取
		if (!this.userInfo.uid) return this.userInfo;

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

	// 获取一条地址信息
	async getOne(addressId) {
		if (!this.userInfo.uid) return this.userInfo;
		return await db.collection('qy-mall-address').doc(addressId).get()
	},

	async getList() {
		if (!this.userInfo.uid) return this.userInfo;

		return await db.collection('qy-mall-address').where({
			user_id: this.userInfo.uid // 必须匹配 uid
		}).orderBy("selected", "desc").orderBy("time", "desc").get()
	},

	// 修改地址信息
	async updateOne(data) {
		if (!this.userInfo.uid) return this.userInfo;
		
		// data 包含_id、user_id、time等
		let newData = {
			...data
		}
		delete newData._id
		
		await db.collection('qy-mall-address').where({
			user_id: this.userInfo.uid // 必须匹配 uid，不能改错用户
		}).update({
			selected: false // 把该用户下的其他地址取消默认
		})
		return await db.collection('qy-mall-address').doc(data._id).update(newData)
	},

	// 修改默认地址
	async updateDefault(_id) {
		if (!this.userInfo.uid) return this.userInfo;
		
		await db.collection('qy-mall-address').where({
			user_id: this.userInfo.uid // 必须匹配 uid，不能改错用户
		}).update({
			selected: false // 把该用户下的其他地址取消默认
		})

		return await db.collection('qy-mall-address').doc(_id).update({
			selected: true
		})
	},
}