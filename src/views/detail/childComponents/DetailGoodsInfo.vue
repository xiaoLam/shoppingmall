<template>
  <div v-if="Object.keys(goodsInfo).length !== 0" class="goodsInfo">
    <div class="info-title">
      {{ goodsInfo.title }}
    </div>
    <div class="info-price">
      <span class="nowprice">{{ goodsInfo.price }}</span>
      <span class="oldprice">{{ goodsInfo.oldPrice }}</span>
      <span
        v-if="goodsInfo.discount"
        class="discount"
        :style="{ backgroundColor: goodsInfo.bgcDiscount }"
        >{{ goodsInfo.discount }}</span
      >
    </div>
    <div class="info-other">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[0].name }}</span>
    </div>
    <div class="info-service">
      <span v-for="index in infoServices" :key="index"
        ><img :src="goodsInfo.services[index - 1].icon" alt="" />
        {{ goodsInfo.services[index - 1].name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    // 限制info-service的展示个数, 最多三个
    infoServices() {
      if (this.goodsInfo.services.length >= 3) return 3;
      return this.goodsInfo.services.length;
    },
  },
};
</script>

<style scoped>
.goodsInfo {
  margin-top: 15px;
  padding: 0 8px;
  box-shadow: 0 -1px 10px rgba(100, 100, 100, 0.1);
}
.goodsInfo .info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .nowprice {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .oldprice {
  font-size: 14px;
  text-decoration: line-through;
  color: #999;
  margin-left: 5px;
}
.info-price .discount {
  color: #fff;
  font-size: 13px;
  padding: 2px 5px;
  border-radius: 7px;
  margin-left: 5px;

  position: relative;
  top: -5px;
}

.info-other {
  margin-top: 10px;
  line-height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.info-service {
  line-height: 60px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.info-service img {
  width: 12px;
  height: 12px;
  position: relative;
  top: 1px;
}
</style>