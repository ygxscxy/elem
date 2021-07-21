import { stat } from "fs"

export default {
  // 将获取到定位信息保存到state中
  setPosition(state, position) {
    state.position = position
  },
  setAddress(state, address) {
    state.address = address
  },
  // mutation中的方法可以在action中进行调用,实现异步操作
  setOrderInfo(state, order_info) {
    state.order_info = order_info
  },
  setCurrentGetAddress(state, currentAddressObj) {
    state.currentGetAddress = currentAddressObj
  },
  setCustomRemarks(state, customRemarks) {
    state.customRemarks = customRemarks
  },
  setUserInfo(state, payload) {
    // console.log(payload);
    state.user_info["currentAddress"] = payload.currentAddress
    state.user_info["selectTableWareCount"] = payload.selectTableWareCount
  }
}
// 更改state中的内容必须要经过mutation mutation中的异步操作必须要经过action
// 调用mutation中的方法使用:$store.commit("方法名",参数)
