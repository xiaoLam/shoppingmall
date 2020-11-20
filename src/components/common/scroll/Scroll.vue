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
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
  mounted() {
    // 为了更加精确地获取到需要的元素, 我们不要用document.querySelect
    // 而是通过给元素设置 ref属性, 通过 this.$refs.refname 来获取元素
    // 通过这样的方式获取元素更加准确, 不会获取到其他的无关元素
    // 为了创建实例在元素加载完毕之后, 设置了一个定时器

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
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
};
</script>