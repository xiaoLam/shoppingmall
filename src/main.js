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

// 引入自己封装的toast插件
import toast from "components/common/toast/index.js"
// 通过Vue.use() 调用 Toast中的install方法
Vue.use(toast)

// 引入fastclick插件
import FastClick from "fastclick"
// 使用fastclick插件
FastClick.attach(document.body)

// 引入图片懒加载模块
import VueLazyLoad from "vue-lazyload"
// 通过Vue.use() 调用图片懒加载模块中的install方法
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
