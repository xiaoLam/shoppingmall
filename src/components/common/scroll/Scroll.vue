<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // 为了确切能拿到scroll实例并且调用其中的方法, 所以调用前先做一个判断
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll.y;
    },
  },
  mounted() {
    // 创建 better-scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 派发滚动事件
      // 这里不应该写死为3, 应该根据需求来设置, 否则写死为3的话会损失性能
      probeType: this.probeType,
      // 派发滚动上拉事件
      pullUpLoad: this.pullUpLoad,
      // 派发点击事件
      // click设置为false/true的时候, button都有点击事件
      // 但是只有这个click设置为true的时候, 页面的非button 盒子才可以有点击事件
      click: true,
    });

    // 监听滚动的方法
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }
    // 监听下拉到了底部的方法
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>