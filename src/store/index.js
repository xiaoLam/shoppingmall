// 引入相关模块
import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 通过Vue.use() 方法 install Vuex
Vue.use(Vuex)

const state = {
  productList : []
}

// 创建store实例
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 将store实例暴露出去
export default store;