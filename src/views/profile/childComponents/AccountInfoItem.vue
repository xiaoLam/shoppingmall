<template>
  <div class="account-info-item">
    <div>
      <span class="num">{{ message.num }}</span>
      <span class="nuit">{{ message.nuit }}</span>
    </div>
    <div class="title">{{ message.name }}</div>
  </div>
</template>

<script>
export default {
  name: "AccountInfoItem",
  props: {
    message: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.account-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.num {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.title {
  margin-top: 5px;
  font-size: 12px;
}
.nuit {
  font-size: 12px;
}
</style>