export default {
  getPosition(state) {
    // console.log(state.position);
    return state.position
  },
  getAddress(state) {
    console.log(state.address);
    return state.address
  },

  getOrderInfo(state) {
    return state.order_info
  },
  getCurrentAddress(state) {
    return state.currentGetAddress
  },
  getCustomRemarks(state) {
    return state.customRemarks
  },
}

// getters中的方法用于获取state中的属性数据的,相当于vue中的计算属性
// 调用方法 $store.getters.方法名

