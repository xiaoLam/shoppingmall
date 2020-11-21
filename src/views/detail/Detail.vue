<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
// 引入自身组件
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";

// 引入网络请求方法
import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      // 存储iid
      id: null,
      topImages: [],
    };
  },
  created() {
    // 在组件创建完毕后, 获取从GoodsListItem路由传过来的iid
    this.id = this.$route.params.iid;

    // 网络请求detail数据
    getDetail(this.id).then((res) => {
      console.log(res);
      // 存储轮播图数据
      this.topImages = res.result.itemInfo.topImages;
    });
  },
};
</script>