<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    // 返回顶部效果的第一个思路是, 从BackTop组件中监听点击事件
    // 通过自定义事件传给Home.vue组件
    // 再在Home.vue中通过this.$refs 获取Scroll组件对象, 调用其中的scroll实例中的scrollTo方法
    // 这种思路其实没有什么必要
    /* backClick() {
      this.$emit("backClick");
    }, */
  },
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 5px;
  bottom: 50px;
}
.back-top img {
  height: 43px;
  width: 43px;
}
</style>