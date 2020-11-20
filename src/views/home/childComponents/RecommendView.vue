<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.sort" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommends {
  display: flex;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 20px;
  border-bottom: 10px solid #eeeeee;
}
.recommends-item {
  flex: 1;
}
.recommends-item img {
  height: 70px;

  margin-bottom: 10px;
}
</style>