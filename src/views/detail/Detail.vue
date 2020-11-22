<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="detailScroll">
      <detail-swiper
        :top-images="topImages"
        @Detail-imageLoad="refreshBetterScroll"
      />
      <detail-goods-info :goods-info="goodsInfo" />
      <detail-shop-info :shop-info="shopInfo" />
      <detail-goods-more-info
        :goods-more-info="goodsMoreInfo"
        @goodsMoreImageLoad="refreshBetterScroll"
      />
      <detail-params-info ref="param" :goods-param="goodsParam" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <p ref="recommend" class="recommends-text">更多商品推荐</p>
      <goods-list :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
// 引入公共组件
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/context/goods/GoodsList";

// 引入自身组件
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsMoreInfo from "./childComponents/DetailGoodsMoreInfo";
import DetailParamsInfo from "./childComponents/DetailParamsInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";

// 引入网络请求方法
import {
  getDetail,
  GoodsInfo,
  ShopInfo,
  GoodsParam,
  getRecommends,
} from "network/detail";

// 引入mixin 混入文件
import { imageLoadListenMixin } from "common/mixin";

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
    GoodsList,
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
      recommends: [],
      themeYs: [],
    };
  },
  methods: {
    // 为了更新better-scroll中设置的高度, 监听DetailSwiper中轮播图的加载
    // 在接收到自定义事件后,调用scroll中的refresh方法,重置better-scroll中设置的高度,避免无法滚动的bug
    refreshBetterScroll() {
      this.$refs.scroll.refresh();

      // 最终我们获取每一个theme的offsetTop值的最终方法是在每一张图片加载完毕的时候获取一次
      // 这样才能达到获取的offsetTop值是正确的
      this.themeYs = [];
      this.themeYs.push(0);
      this.themeYs.push(this.$refs.param.$el.offsetTop);
      this.themeYs.push(this.$refs.comment.$el.offsetTop);
      this.themeYs.push(this.$refs.recommend.offsetTop);

      console.log(this.themeYs);
    },

    // 监听标题点击的事件
    titleClick(index) {
      // 在点击标题后调用scroll实例中的scrollTo()方法
      this.$refs.scroll.scrollTo(0, -this.themeYs[index], 500);
    },

    // 监听详情页面的滚动事件
    detailScroll() {
      // 获得当前页面滚到的位置
      const positionY = -this.$refs.scroll.getScrollY();

      // 根据当前页面滚到的位置和各个theme的对应位置作一个判断

      for (let i = 0; i < this.themeYs.length; i++) {
        if (
          this.$refs.detailNavBar.currentType !== i &&
          ((i < this.themeYs.length - 1 &&
            positionY >= this.themeYs[i] &&
            positionY < this.themeYs[i + 1]) ||
            (i == this.themeYs.length - 1 && positionY >= this.themeYs[i]))
        ) {
          this.$refs.detailNavBar.currentType = i;
        }
      }
    },
  },
  // 使用mixin.js中的方法
  mixins: [imageLoadListenMixin],
  created() {
    // 在组件创建完毕后, 获取从GoodsListItem路由传过来的iid
    this.id = this.$route.params.iid;

    // 网络请求detail数据
    getDetail(this.id).then((res) => {
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
      }
      // 然后我们再尝试在获取数据的地方
      // 用 this.$nextTick 这个回调函数中获取每一个theme的offsetTop值
      // this.$nextTick 这个函数会在DOM元素渲染完毕后调用
      // 但是这个方法获取到的offsetTop值也是不包含图片的高度的
      /* this.$nextTick(() => {
        this.themeYs = [];

        this.themeYs.push(0);
        this.themeYs.push(this.$refs.param.$el.offsetTop);
        this.themeYs.push(this.$refs.comment.$el.offsetTop);
        this.themeYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeYs);
      }); */
    });

    // 网络请求并存储推荐模块的数据
    getRecommends().then((res) => {
      this.recommends = res.data.list;
    });

    // 我们尝试在created中获取每一个theme的offsetTop值
    // 实际上, 在created中, 页面的DOM还挂载, 所以根本就获取不了元素, 获取元素的高度就是不可能的
    /* this.themeYs.push(0);
    this.themeYs.push(this.$refs.param.$el.offsetTop);
    this.themeYs.push(this.$refs.comment.$el.offsetTop);
    this.themeYs.push(this.$refs.recommend.$el.offsetTop);

    console.log(this.themeYs); */
  },
  mounted() {
    /* // 监听goodslistitem中的图片加载完毕事件
    // 一下代码抽离到common/mixin.js中了
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.ImageLoadListen = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ImageLoadListen); */
    // 然后我们尝试在mounted中获取每一个theme的offsetTop值
    // 在mounted中获取元素是成功的, 但是元素还没有渲染出来, 所以获取到的offsetTop值是undefined
    /* this.themeYs.push(0);
    this.themeYs.push(this.$refs.param.$el.offsetTop);
    this.themeYs.push(this.$refs.comment.$el.offsetTop);
    this.themeYs.push(this.$refs.recommend.$el.offsetTop);

    console.log(this.themeYs); */
  },
  updated() {
    // 我们尝试在updated中获取每一个theme的offsetTop值
    // updated函数会在数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用
    // 但是这个获取到的高度是不包含未加载的图片高度的, 所以获取的offsetTop值是错误的
    /* this.themeYs = [];

    this.themeYs.push(0);
    this.themeYs.push(this.$refs.param.$el.offsetTop);
    this.themeYs.push(this.$refs.comment.$el.offsetTop);
    this.themeYs.push(this.$refs.recommend.$el.offsetTop);

    console.log(this.themeYs); */
  },
  destoryed() {
    // 在组件销毁的时候取消监听事件总线中的图片加载事件
    this.$bus.$off("itemImageLoad", this.ImageLoadListen);
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
.recommends-text {
  margin-top: 15px;
  border-top: 3px solid rgba(100, 100, 100, 0.1);

  padding-left: 15px;
  line-height: 60px;
  height: 60px;
}
</style>