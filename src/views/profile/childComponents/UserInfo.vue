<template>
  <div class="user-info">
    <img class="avatar" src="~assets/img/profile/avatar.svg" alt="" />
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="" />
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
.user-info {
  height: 85px;
  background-color: var(--color-tint);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
}
.avatar {
  width: 70px;
}
.info {
  color: #fff;
  position: relative;
  left: -55px;
}
.info .login {
  font-size: 16px;
}
.info .phone {
  font-size: 13px;
  margin-top: 6px;
}
.info .phone img {
  width: 20px;
  vertical-align: middle;
  margin-left: -5px;
}
.arrow img {
  width: 20px;
}
</style>