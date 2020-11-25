<template>
  <scroll class="content" ref="scroll">
    <div class="product-list">
      <product-list-item
        v-for="(item, index) in productList"
        :key="index"
        :productListItem="item"
      />
    </div>
  </scroll>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

import ProductListItem from "./ProductListItem";

export default {
  name: "ProductList",
  components: {
    ProductListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["productList"]),
  },
  // 我们发现在添加商品进入购物车的时候, better-scroll并重置scroll的高度
  // 所以我们手动地在购物车页面进入活跃的时候进行重置scroll中的高度
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>

