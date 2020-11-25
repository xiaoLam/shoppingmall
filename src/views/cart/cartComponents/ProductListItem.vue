<template>
  <div class="list-item">
    <div class="item-check">
      <check-button
        :isChecked="productListItem.checked"
        @click.native="checkClick"
      />
    </div>
    <div class="item-img">
      <img :src="productListItem.image" alt="" />
    </div>
    <div class="item-info">
      <div class="info-title">{{ productListItem.title }}</div>
      <div class="info-desc">{{ productListItem.desc }}</div>
      <div class="info-price">
        <span class="price">￥{{ productListItem.price }}</span>
        <span class="num">×{{ productListItem.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/context/checkButton/CheckButton";

export default {
  name: "ProductListItem",
  components: {
    CheckButton,
  },
  props: {
    productListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 修改对应商品对象中的checked属性
    // 这里是 通过 actions -> mutations -> state 来更改的
    checkClick() {
      this.$store.dispatch("changeCheck", this.productListItem.id);
    },
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
  align-items: center;
  padding: 3px;
}
.item-check {
  width: 20px;
  margin: 0px 3px 0px 2px;
}
.item-img {
  flex: 2;
}
.item-img img {
  width: 100%;
  border-radius: 5px;
}

.item-info {
  flex: 7;
  padding: 5px 10px;
  overflow: hidden;
}
.info-title,
.info-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
}
.info-desc {
  font-size: 12px;
  margin-bottom: 20px;
}
.info-price {
  display: flex;
  justify-content: space-between;
}
.info-price .price {
  color: #fa5513;
}
</style>