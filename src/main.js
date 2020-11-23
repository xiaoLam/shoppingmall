import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from "./store/index"

Vue.config.productionTip = false

// 创建事件总线对象
// 这个事件总线对象是用来非父子组件之间传递事件的
// 通过 this.$bus.$emit("事件类型") 发送
// 通过 this.$bus.$on("事件类型", func) 接收并执行回调函数
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
