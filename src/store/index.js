import Vue from 'vue'
import Vuex from 'vuex'


import getters from "./getters.js"
import mutations from "./mutations.js"
import actions from './actions.js'

Vue.use(Vuex)


const state = {
  position: {},
  address: ""
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,

})
