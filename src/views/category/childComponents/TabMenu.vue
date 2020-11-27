<template>
  <scroll ref="scroll" class="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "TabMenu",
  components: {
    Scroll,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    },
  },
  // 因为数据加载到这个组件之前, better-scroll就已经设定好了高度
  // 数据传输过来并且渲染完的时候, better-scroll却没有重置这个高度
  // 所以这里用了一个小技巧, 在这个组件创建完的时候设置了一个定时器在200ms的时候调用better-scroll中的refresh方法
  created() {
    setTimeout(() => {
      this.$refs.scroll.refresh();
    }, 200);
  },
};
</script>

<style scoped>
.tab-menu {
  height: 100%;
  width: 100px;
  background-color: #f6f6f6;
  box-sizing: border-box;
}
.menu-list-item {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}
.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>