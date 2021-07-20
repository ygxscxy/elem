export default {
  // 调用mutation中的函数
  setPosition(context, position) {
    context.commit("setPosition", position)
  },
  setAddress(context, address) {
    context.commit("setAddress", address)
  },

  // 外界调用
  setOrderInfo(context, order_info) {
    context.commit("setOrderInfo", order_info)
  },
  setCurrentAdress(context, currentAddress) {
    context.commit("setCurrentGetAddress", currentAddress)
  },
  setCustomRemarks(context, customRemarks) {
    context.commit("setCustomRemarks", customRemarks)
  }
}

// 调用action中的方法使用: $store.dispatch("方法名",参数)