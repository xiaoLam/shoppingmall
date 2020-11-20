// 商品列表
<template>
  <div class="goods">
    <!-- 遍历生成 goods-list-item -->
    <!-- 将goods中的每一个goods通过props传给GoodsListItem -->
    <goods-list-item v-for="item in goods" :goodsitem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    // 通过props拿到从Home.vue传输过来的goods数据
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>