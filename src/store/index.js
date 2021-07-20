import Vue from 'vue'
import Vuex from 'vuex'


import getters from "./getters.js"
import mutations from "./mutations.js"
import actions from './actions.js'

Vue.use(Vuex)


const state = {
  position: {},
  address: "",
  // 保存订单信息
  order_info: null,
  currentGetAddress: null,
  customRemarks: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,

})
