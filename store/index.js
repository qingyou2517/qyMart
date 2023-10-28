import createPersistedState from 'vuex-persistedstate' // 引入数据持久化插件
import Vue from 'vue'
import Vuex from 'vuex'

import getters from '@/store/getters.js'

import system from '@/store/modules/system.js'
import cars from '@/store/modules/cars.js'
import brand from '@/store/modules/brand.js'
import goods from '@/store/modules/goods.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	getters,
	modules: {
		system,
		cars,
		brand,
		goods,
	},
	plugins: [
		createPersistedState({
			paths: ['cars'],
			storage: { // 存储方式定义  
				getItem: (key) => uni.getStorageSync(key), // 获取  
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
				removeItem: (key) => uni.removeStorageSync(key) // 删除  
			}
		})
	]
})

export default store