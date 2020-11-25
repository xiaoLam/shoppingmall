import {COUNT_ADD,ADD_TO_CART,REFRESH_CHECK} from "./mutation-type"

export default {
  addCart(context, payload) {

    // 在这里我们要判断添加的商品是否重复
    // 如果没有重复, 就给该商品对象添加一个新的属性count 来记录它的数量
    // 如果重复了, 就给该商品的属性count + 1
    // 下面列举两种方法都能够达到目标
    // 在mutations中方法应该只进行简单的操作
    // 所以addCart应该都写在actions中, 然后最后的更新state状态的操作交给mutations来完成
    
    // 第一种方法
    // 这个方法的重要点是在 oldProduct = item 这句是浅拷贝
    /* let oldProduct = null
    for (let item of state.productList) {
      if (item.id === payload.id) {
        oldProduct = item
      }
    }

    if (oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.productList.push(payload)
    } */

    // 第二种方法
    // 通过数组方法 find

    // 通过Promise对象向Detail组件返回一个信息
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.productList.find((item) => {
        return payload.id == item.id
      })
      if (oldProduct) {
        context.commit(COUNT_ADD, oldProduct)
        resolve("当前商品数量+1")
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve("成功添加入购物车")
      }
    })
  },

  // 购物车页面改变商品是否选中
  changeCheck(context,payload) {
    let changeProduct = context.state.productList.find((item) => {
      return payload == item.id
    })
    context.commit(REFRESH_CHECK, changeProduct)
  },

}