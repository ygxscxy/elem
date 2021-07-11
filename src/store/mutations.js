export default {
  // 将获取到定位信息保存到state中
  setPosition(state, position) {
    state.position = position
  },
  setAddress(state, address) {
    state.address = address
  }
}