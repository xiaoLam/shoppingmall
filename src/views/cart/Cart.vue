<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <product-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import ProductList from "./cartComponents/ProductList";
import CartBottomBar from "./cartComponents/CartBottomBar";

// 使用vuex中getters的辅助函数
// 从vuex中引入mapGetters对象
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    ProductList,
    CartBottomBar,
  },
  computed: {
    // 直接从store共享数据对象中取出productList 然后取它的length
    /* productLength() {
      return this.$store.getters.productList.length;
    }, */
    // 在store共享数据对象中定义getters, 在getters中定义productLength方法
    /* productLength() {
      return this.$store.getters.productLength;
    } */
    // 我们发现上面两个方法代码都很长很重复
    // 所以我们用vuex中的getters辅助函数

    // mapGetters中有两种方法取getters中的方法
    // 数组方法
    // ...mapGetters(["productLength"]),

    // 如果想要给getters中的方法用一个新的名字, 那么就要用对象语法
    ...mapGetters({
      cartLength: "productLength",
    }),
  },
  mounted() {},
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>