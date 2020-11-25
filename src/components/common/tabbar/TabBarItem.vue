<template>
  <div class="flex-item" @click="itemClick">
    <div v-show="!isActive"><slot name="item-icon"></slot></div>
    <div v-show="isActive"><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{ active: isActive }"><slot name="item-text"></slot></div> -->
    <!-- 要将组件封装得彻底, 颜色也可以让外部决定 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
    },
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1 ? true : false;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style scoped>
.flex-item {
  flex: 1;
  /* 在移动端开发中, tabbar的高度通常为49px */
  height: 49px;

  font-size: 14px;
}
.flex-item img {
  height: 20px;
  width: 20px;
  margin: 4px;

  vertical-align: middle;
  margin-top: 3px;
}

.active {
  color: rgb(252, 126, 126);
}
</style>