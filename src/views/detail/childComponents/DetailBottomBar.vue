<template>
  <div class="bottom-bar">
    <div class="bottom-item">
      <i class="icon service"></i>
      <span class="text">客服</span>
    </div>
    <div class="bottom-item">
      <i class="icon store"></i>
      <span class="text">店铺</span>
    </div>
    <div class="bottom-item" @click="collectClick">
      <i class="icon collect" :class="{ active: collectActive }"></i>
      <span class="text">收藏</span>
    </div>
    <div class="bottom-cart" @click="addToCart">加入购物车</div>
    <div class="bottom-buy">购买</div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {
      collectActive: false,
    };
  },
  methods: {
    collectClick() {
      this.collectActive = !this.collectActive;
    },
    addToCart() {
      this.$emit("addToCart");
    },
  },
};
</script> 

<style scoped>
.bottom-bar {
  background-color: #fff;
  height: 49px;
  text-align: center;

  position: relative;

  display: flex;
}
.bottom-bar .bottom-item {
  flex: 1;
}
.icon {
  display: block;
  height: 22px;
  width: 22px;
  margin: 5px auto 1px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.service {
  background-position-y: -52px;
}

.store {
  background-position-y: -98px;
}
.collect {
  background-position-y: 2px;
}
.active {
  background-position-y: -26px;
}

.text {
  font-size: 13px;
  color: #333;
}
.bottom-cart {
  flex: 2;
  line-height: 49px;
  font-size: 14px;
  background-color: #ffde0e;
  color: #333;
}
.bottom-buy {
  flex: 2;
  line-height: 49px;
  font-size: 14px;
  background-color: #ff779d;
  color: #fff;
}
</style>