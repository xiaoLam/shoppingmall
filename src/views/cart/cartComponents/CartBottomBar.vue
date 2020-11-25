<template>
  <div class="cart-bottom-bar">
    <div class="all-checked" @click="selectAllClick">
      <check-button :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="total">合计:￥{{ totalPrice }}</div>
    <div class="calculate" @click="goSum">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/context/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["productList"]),
    totalPrice() {
      return this.productList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.productList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      // 判断购物车中物品是否没有, 没有就不用选中
      if (this.productList.length === 0) return false;

      // 第一种方法: 使用数组filter方法
      /* return !this.productList.filter((item) => {
        return !item.checked;
      }).length; */

      // 第二种方法: 使用数组find方法, 这个方法比第一种性能更佳, 因为find方法只要找到符合条件的就立即返回这个元素
      // !的操作数如果是对象的话, 会返回false
      return !this.productList.find((item) => {
        return !item.checked;
      });

      // 第三种方法: 普通遍历方法
      /* for (let item of this.productList) {
        if (!item.checked) return false;
      }
      return true; */
    },
  },
  methods: {
    selectAllClick() {
      // 我们需要修改共享数据中的state
      // 所以我们这个思路去修改 点击事件 ->  mutations -> 修改state
      /* if (this.isSelectAll) {
        // 全不选
        this.$store.commit("cancelAll");
      } else {
        // 全选
        this.$store.commit("selectAll");
      } */

      // 全选全不选简写
      this.$store.commit("AllChange", this.isSelectAll);
    },
    goSum() {
      if (
        this.$store.state.productList.filter((item) => {
          return item.checked;
        }).length == 0
      ) {
        this.$toast.show("请选择想要购买的商品");
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  align-items: center;

  height: 40px;

  background-color: #eee;
  font-size: 14px;
  text-align: center;
}
.all-checked {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;

  width: 60px;
}

.total {
  flex: 1;
}

.calculate {
  width: 100px;
  height: 40px;
  line-height: 40px;

  background-color: red;
  color: #fff;
}
</style>