<template>
  <div class="goods-item">
    <img v-lazy="showImg" alt="" @load="imageload" @click="itemClick" />
    <div class="info">
      <p>{{ goodsitem.title }}</p>
      <span class="price">{{ goodsitem.price }}</span>
      <span class="collect">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    // 通过props拿到从GoodsList传输来的goodsitem数据
    goodsitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImg() {
      return this.goodsitem.image || this.goodsitem.show.img;
    },
  },
  methods: {
    imageload() {
      this.$bus.$emit("itemImageLoad");

      /* if (this.$route.path.indexOf("/home") >= 0) {
        this.$bus.$emit("homeitemImageLoad");
      } else if (this.$route.path.indexOf("/detail") >= 0) {
        this.$bus.$emit("detailitemImageLoad");
      } */
    },
    itemClick() {
      // 在点击图片后跳转路由, 并且带上数据的iid
      // 理论上在详情页的推荐模块中点击推荐的商品也可以跳转路由并带上iid
      // 但是可惜后端并没有做推荐商品的数据, 所以只好放弃这个
      // const id = this.goodsitem.iid || this.goodsitem.item_id;
      this.$router.push("/detail/" + this.goodsitem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 30px;
  text-align: center;
  width: 48%;
  font-size: 12px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-item .info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.goods-item .info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-item .info .price {
  color: var(--color-tint);
}
.goods-item .info .price {
  margin-right: 20px;
}
.goods-item .info .collect {
  position: relative;
}
.goods-item .info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>