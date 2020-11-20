// 底部导航栏
<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tabbar {
  display: flex;
  background-color: #f6f6f6;

  text-align: center;

  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;

  box-shadow: 1px 0px 10px rgba(100, 100, 100, 0.3);
}
</style>