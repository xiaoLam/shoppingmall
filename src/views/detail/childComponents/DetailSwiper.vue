<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" @load="DetailImageLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
// 引入公共组件
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      sendImgLoad: true,
    };
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 监听图片加载事件, 加载完毕后将信息传给Detail.vue组件, 让Detail.vue组件重置better-scroll中设置的高度
    DetailImageLoad() {
      // 没有必要多次发送这个信息, 发送一次就行了
      if (this.sendImgLoad) {
        this.$emit("DetailImageLoad");
      }
      this.sendImgLoad = false;
    },
  },
};
</script>>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>