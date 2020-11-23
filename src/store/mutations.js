import {COUNT_ADD,ADD_TO_CART} from "./mutation-type"

export default {
  [COUNT_ADD](state,payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state,payload) {
    state.productList.push(payload)
  }
}