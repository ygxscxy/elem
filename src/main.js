import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

