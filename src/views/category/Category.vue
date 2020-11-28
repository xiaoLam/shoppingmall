<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <scroll
        class="tab-content"
        ref="scroll"
        :probe-type="3"
        @scroll="scrollBack"
      >
        <div>
          <tab-content-category :subcategories="showSubcategory" />
          <tab-control
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          />
          <goods-list :goods="showCategoryDetail" />
        </div>
      </scroll>
      <back-top @click.native="backClick" v-show="showBackTop" />
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/context/tabControl/TabControl.vue";
import GoodsList from "components/context/goods/GoodsList";

import TabMenu from "./childComponents/TabMenu";
import TabContentCategory from "./childComponents/TabContentCategory";

// 引入网络请求模块
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

// 引入图片加载完毕刷新better-scroll的方法 和 返回顶部按钮
import { imageLoadListenMixin, BackTopMixin } from "common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContentCategory,
    TabControl,
    GoodsList,
  },
  // 使用混入
  mixins: [imageLoadListenMixin, BackTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },
  created() {
    // 请求分类的数据
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1. 获取分类的数据
        this.categories = res.data.category.list;

        // 2. 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3. 请求第一项分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;

        // 利用扩展运算符重新赋值的方法, 触发Vue的响应机制
        this.categoryData = { ...this.categoryData };

        // 请求getCategoryDetai的数据
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;

      // 2. 发送请求, 传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        // 利用扩展运算符重新赋值的方法, 触发Vue的响应机制
        this.categoryData = { ...this.categoryData };
      });
    },
    // 切换tab展示的数据
    tabClick(index) {
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
      console.log(this.currentType);
    },
    // 切换分类请求的数据
    selectItem(index) {
      this._getSubcategories(index);
    },

    // 返回顶部
    scrollBack(position) {
      this.listenShowBackTop(position);
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.category-nav {
  color: #fff;
  background-color: var(--color-tint);
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  display: flex;
}
.tab-content {
  height: 100%;
  flex: 1;
}
</style>