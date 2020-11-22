<template>
  <div v-if="Object.keys(goodsMoreInfo).length !== 0" class="goods-more-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ goodsMoreInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">
      {{ goodsMoreInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <img
        v-for="(item, index) in goodsMoreInfo.detailImage[0].list"
        :key="index"
        :src="item"
        alt=""
        @load="goodsMoreImageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsMoreInfo",
  data() {
    return {
      counterLoadImage: 0,
      imagesLength: 0,
    };
  },
  props: {
    goodsMoreInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 监听图片加载将其传给Detail.vue组件, 让其执行重置betterScroll中设置的高度
    goodsMoreImageLoad() {
      // 这里我决定每一次加载完图片就发送一个事件更好, 因为图片的加载也不是同步的
      /* this.counterLoadImage += 1;
      if (this.counterLoadImage == this.imagesLength) {
        this.$emit("goodsMoreImageLoad");
      } */

      this.$emit("goodsMoreImageLoad");
    },
  },
  // watch中的方法可以监听某个属性的改变, 如果改变了会调用函数
  /* watch: {
    goodsMoreInfo() {
      this.imagesLength = this.goodsMoreInfo.detailImage[0].list.length;
    },
  }, */
};
</script>

<style scoped>
.goods-more-info {
  padding: 20px;
  border: 3px solid rgba(100, 100, 100, 0.1);
}
.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  top: -5px;
  width: 5px;
  height: 5px;
  background-color: #333;
}
.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
}

.info-list img {
  width: 100%;
}
</style>