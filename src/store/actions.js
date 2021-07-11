export default {
  // 调用mutation中的函数
  setPosition(context, position) {
    context.commit("setPosition", position)
  },
  setAddress(context, address) {
    context.commit("setAddress", address)
  }
}