<template>
  <div class="account-info">
    <account-info-item
      class="account-info-item"
      v-for="(item, index) in itemInfo"
      :key="index"
      :message="item"
    ></account-info-item>
  </div>
</template>

<script>
import AccountInfoItem from "./AccountInfoItem";

export default {
  name: "AccountInfo",
  data() {
    return {
      itemInfo: {
        balance: {
          name: "我的余额",
          num: "0.00",
          nuit: "元",
        },
        discount: {
          name: "我的优惠",
          num: "0",
          nuit: "个",
        },
        score: {
          name: "我的积分",
          num: "0",
          nuit: "分",
        },
      },
    };
  },
  components: {
    AccountInfoItem,
  },
};
</script>

<style scoped>
.account-info {
  display: flex;
  height: 85px;
  text-align: center;
}
.account-info-item {
  flex: 1;
}
.account-info-item:nth-child(2) {
  border: 1px solid rgba(100, 100, 100, 0.1);
  border-bottom: 0;
  border-top: 0;
}
</style>

