<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper
        :topImages="topImages"
        @DetailImageLoad="refreshBetterScroll"
      />
      <detail-goods-info :goodsInfo="goodsInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-goods-more-info
        :goodsMoreInfo="goodsMoreInfo"
        @goodsMoreImageLoad="refreshBetterScroll"
      />
      <detail-params-info :goodsParam="goodsParam" />
      <detail-comment-info :commentInfo="commentInfo" />
    </scroll>
  </div>
</template>

<script>
// 引入公共组件
import Scroll from "components/common/scroll/Scroll";

// 引入自身组件
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsMoreInfo from "./childComponents/DetailGoodsMoreInfo";
import DetailParamsInfo from "./childComponents/DetailParamsInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";

// 引入网络请求方法
import { getDetail, GoodsInfo, ShopInfo, GoodsParam } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailGoodsMoreInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    Scroll,
  },
  data() {
    return {
      // 存储iid
      id: null,
      topImages: null,
      goodsInfo: {},
      shopInfo: {},
      goodsMoreInfo: {},
      goodsParam: {},
      commentInfo: {},
    };
  },
  methods: {
    // 为了更新better-scroll中设置的高度, 监听DetailSwiper中轮播图的加载
    // 在接收到自定义事件后,调用scroll中的refresh方法,重置better-scroll中设置的高度,避免无法滚动的bug
    refreshBetterScroll() {
      this.$refs.scroll.refresh();
    },
  },
  created() {
    // 在组件创建完毕后, 获取从GoodsListItem路由传过来的iid
    this.id = this.$route.params.iid;

    // 网络请求detail数据
    getDetail(this.id).then((res) => {
      console.log(res);
      let data = res.result;

      // 存储轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 创建商品信息的对象并存储
      this.goodsInfo = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店家信息的对象并存储
      this.shopInfo = new ShopInfo(data.shopInfo);

      // 存储更多商品信息数据
      this.goodsMoreInfo = data.detailInfo;

      // 创建商品参数信息对象并存储
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 存储商品评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        console.log(this.commentInfo);
      }
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
</style>