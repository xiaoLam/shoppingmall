<template>
  <div class="normal-list">
    <div v-for="(item, index) in listData" :key="index" class="list-item">
      <img class="icon" :src="iconUrl(item.icon)" alt="" />
      <span class="info">{{ item.info }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    iconUrl(icon) {
      return require("assets/img/profile/" + icon);
    },
  },
};
</script>

<style scoped>
.normal-list {
  border-top: 15px solid rgba(100, 100, 100, 0.1);
}
.list-item {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.icon {
  width: 20px;
  position: relative;
  top: 3px;
  margin: 0 10px 0 20px;
}
</style>