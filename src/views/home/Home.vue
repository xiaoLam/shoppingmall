<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollBack"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="showBackTop" />
  </div>
</template>

<script>
// 在这里引入的是chilidComponents中的组件
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import FeatureView from "./childComponents/FeatureView";

// 在这里引入的是components中的组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/tabControl/TabControl";
import GoodsList from "components/context/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/context/backTop/BackTop";

// 引用本组件的网络请求js文件
import { getmultidata, gethomegoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: null,
      recommends: null,
      // 定义goods变量, 用于存储请求过来的goods数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 定义第三变量, 控制展示的goodslist
      currentType: "pop",
      // 定义第三变量, 控制返回顶部按钮的显示和隐藏
      showBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /*
     ** 事件响应相关的方法
     */
    // 监听从TabControl传来的自定义方法, 组件数据传输: 子传父
    tabClick(index) {
      // 根据index改变展示的goodslist
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.scroll.scroll.refresh();
      console.log("11");
    },
    // 点击返回顶部按钮的时候, 调用scroll组件中的scrollTo方法返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 通过自定义事件获取从scroll传递过来的position, 以此判断返回顶部按钮的显示和隐藏
    scrollBack(position) {
      this.showBackTop = -position.y > 1000 ? true : false;
    },
    loadMore() {
      this.gethomegoods(this.currentType);
    },

    /*
     ** 网络请求相关的方法
     */
    // 将网络请求方法封装在methods中
    // 请求multidata数据
    getmultidata() {
      getmultidata().then((res) => {
        // 将网络请求返回的数据存储在组件中
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求goods数据
    gethomegoods(type) {
      const page = this.goods[type].page + 1;
      gethomegoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 在每次加载完图片重置better-scroll
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.scroll.refresh();
      });
    },
  },
  // 在组件创建完毕的时候发送网络请求
  created() {
    // 在生命周期函数中只写主要的逻辑, 具体操作应该写在组件的methods中

    // 请求multidata数据
    this.getmultidata();

    // 请求goods中的数据
    this.gethomegoods("pop");
    this.gethomegoods("new");
    this.gethomegoods("sell");
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */

  /* vh单位是 viewport height 就是视图单位的意思 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* 在这里简单实现以下 tabControl 的向下滚动后粘附顶部的效果 */
.tab-control {
  /* 使用了better-scroll后这个sticky粘性定位就没有效果了 */
  /* position: sticky; */
  top: 43px;
  z-index: 9;
}
/* 第一种方法: 通过定位来撑开盒子 */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 第二种方法: 通过calc计算盒子高度 */
/* .content {
  height: calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden;
} */
</style>