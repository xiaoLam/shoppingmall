import {COUNT_ADD,ADD_TO_CART,REFRESH_CHECK,ALL_CHANGE} from "./mutation-type"

export default {
  // 添加购物车商品重复数量+1
  [COUNT_ADD](state,payload) {
    payload.count += 1
  },
  // 添加购物车商品不重复, 往商品数组添加一个对象
  [ADD_TO_CART](state,payload) {
    payload.checked = true
    state.productList.push(payload)
  },
  // 购物车商品是否选择
  [REFRESH_CHECK](state, payload) {
    payload.checked = !payload.checked
  },
  // 购物车页面全选
  /* selectAll(state,payload) {
    state.productList.forEach(item => {
      item.checked = true
    })
  },
  // 全不选
  cancelAll(state, payload) {
    state.productList.forEach(item => {
      item.checked = false
    })
  } */

  // 全选全不选简写
  [ALL_CHANGE](state, payload) {
    state.productList.forEach(item => {
      item.checked = !payload
    })
  }


}