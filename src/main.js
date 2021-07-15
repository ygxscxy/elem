import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Router from 'vue-router'

// mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import "network/indicator/Indicator.js"

// 导入全局样式
import "/public/css/index.css"

// uilts
import formatImgSrc from './uilts/formatImgSrc'

Vue.config.productionTip = false


Vue.use(MintUI)

// 格式化图片地址
Vue.prototype.$formatImgSrc = formatImgSrc
// 事件总线
Vue.prototype.$EventBus = new Vue()

// 一个路由按钮被多次点击后报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

