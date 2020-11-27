<template>
  <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" v-lazy="item.image" alt="" @load="imageLoad" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </grid-view>
</template>

<script>
import GridView from "components/common/gridView/GridView";

export default {
  name: "TabContentCategory",
  components: {
    GridView,
  },
  props: {
    subcategories: {
      type: Object,
      defatul() {
        return [];
      },
    },
  },
  methods: {
    imageLoad() {
      this.$emit("imageLoad");
    },
  },
};
</script>

<style scoped>
.item {
  text-align: center;
  font-size: 12px;
}
.item-img {
  width: 80%;
}
.item-text {
  margin-top: 15px;
}
</style>