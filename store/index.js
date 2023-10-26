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
	}
})

export default store