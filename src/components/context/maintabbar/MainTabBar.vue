<template>
  <tar-bar>
    <tar-bar-item path="/home" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tar-bar-item>
    <tar-bar-item path="/category" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tar-bar-item>
    <tar-bar-item path="/cart" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
      />

      <div slot="item-text">购物车</div>
    </tar-bar-item>
    <tar-bar-item path="/profile" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tar-bar-item>
  </tar-bar>
</template>
<script>
import TarBar from "components/common/tabbar/TabBar.vue";
import TarBarItem from "components/common/tabbar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  components: { TarBar, TarBarItem },
};
</script>