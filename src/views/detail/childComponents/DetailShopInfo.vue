<template>
  <div class="shop-info">
    <div class="shop-logo">
      <img :src="shopInfo.logo" alt="" />
      <span>{{ shopInfo.name }}</span>
    </div>
    <div class="shop-detail-info">
      <div class="shop-sell-goods shop-detail-info-item">
        <div class="sell-item shop-sell-goods-item">
          <div>{{ sells }}万</div>
          <div class="item-text">总销量</div>
        </div>
        <div class="goods-item shop-sell-goods-item">
          <div>{{ shopInfo.goods }}</div>
          <div class="item-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-score shop-detail-info-item">
        <div
          class="shop-score-item"
          v-for="(item, index) in shopInfo.score"
          :key="index"
        >
          <span>{{ item.name }}</span>
          <span class="score" :class="{ 'score-better': item.isBetter }">{{
            item.score.toFixed(2)
          }}</span>
          <span class="icon" :class="{ 'better-icon': item.isBetter }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    sells() {
      if (this.shopInfo.sells < 10000) return this.shopInfo.sells;
      return (this.shopInfo.sells / 10000).toFixed(1);
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 25px 0px;
}
.shop-logo {
  margin-left: 15px;
  height: 54px;
}
.shop-logo img {
  height: 54px;
  border-radius: 50%;
  border: 1px solid rgba(100, 100, 100, 0.1);
}
.shop-logo span {
  font-size: 16px;

  position: relative;
  left: 10px;
  top: -20px;
}
.shop-detail-info {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.shop-detail-info-item {
  flex: 1;
}

.shop-sell-goods {
  display: flex;
  justify-content: space-around;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.shop-sell-goods-item {
  flex: 1;
}
.sell-item,
.goods-item {
  font-size: 14px;
}
.item-text {
  margin-top: 3px;
  font-size: 12px;
}

.shop-score {
  font-size: 12px;
}
.shop-score-item {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}
.score {
  color: #5ea732;
}
.score-better {
  color: #f13e3a;
}
.icon {
  color: #fff;
  background-color: #5ea732;
}
.better-icon {
  background-color: #f13e3a;
}
.shop-bottom {
  text-align: center;
  margin-top: 10px;
}

.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>