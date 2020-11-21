<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControlClone"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollBack"
      :pullUpLoad="true"
      @pullingUp="MoreLoad"
    >
      <home-swiper :banners="banners" @swiperImgload="swiperImgload" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl"
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

// 在这里引入工具
import { debounce } from "common/untils";

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
      // 记录TabControl的offsetTop值
      tabControlOffsetTop: 0,
      // 定义第三变量, 控制tabControl是否加上fixed样式
      isTabFixed: false,
      // 定义第三变量, 记录离开Home.vue的时候的滚动位置
      scrollY: 0,
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
      // 让两个TabControl组件同步起来
      this.$refs.tabControl.contorlIndex = index;
      this.$refs.tabControlClone.contorlIndex = index;
    },
    // 点击返回顶部按钮的时候, 调用scroll组件中的scrollTo方法返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 通过自定义事件获取从scroll传递过来的position, 以此判断返回顶部按钮的显示和隐藏
    scrollBack(position) {
      // 决定返回顶部按钮是否显示
      this.showBackTop = -position.y > 1000 ? true : false;

      // 决定tabControl是否加上fixed样式
      this.isTabFixed = -position.y > this.tabControlOffsetTop ? true : false;
    },
    // 监听到滚动到了底部的方法后,调用gethomegoods方法加载更多的goods
    MoreLoad() {
      this.gethomegoods(this.currentType);
    },
    // 动态地获取tabControl的offsetTop
    swiperImgload() {
      // 获取TabControl的offsetTop值
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
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

        // 完成上拉加载更多后重置pullUpLoad
        this.$refs.scroll.finishPullUp();
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

  activated() {
    // 进入Home.vue的时候将滚动设置到记录的滚动位置
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    // 注意: 在设置完之后重置一下better-scroll实例
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 记录离开Home.vue的时候的滚动位置
    this.scrollY = this.$refs.scroll.getScrollY();
  },
  // 注意要在mounted中获取DOM元素
  mounted() {
    // 监听goodslistitem中的图片加载完毕事件
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
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

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* 在这里简单实现以下 tabControl 的向下滚动后粘附顶部的效果 */
.tab-control {
  /* 使用了better-scroll后这个sticky粘性定位就没有效果了 */
  /* position: sticky;
  top: 43px;
  z-index: 9; */
  position: relative;
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