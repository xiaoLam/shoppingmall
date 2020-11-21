// 轮播图组件
<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link"
        ><img :src="item.image" alt="" @load="swiperImgload"
      /></a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      sendImgLoad: true,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    // 我们并不需要频繁地发送这个事件, 只需要发送一次就行了

    swiperImgload() {
      if (this.sendImgLoad) {
        this.$emit("swiperImgload");
      }
      this.sendImgLoad = false;
    },
  },
};
</script>