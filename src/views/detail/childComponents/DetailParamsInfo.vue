<template>
  <div v-if="Object.keys(goodsParam).length !== 0" class="param-info">
    <div class="key">
      {{ goodsParam.sizekey }}
    </div>
    <table
      v-for="(table, tableindex) in goodsParam.sizes"
      :key="tableindex"
      class="size-table"
    >
      <tr v-for="(tr, trindex) in table" :key="trindex">
        <td v-for="(td, tdindex) in tr" :key="tdindex">{{ td }}</td>
      </tr>
    </table>
    <div class="key">
      {{ goodsParam.infokey }}
    </div>
    <table class="info-table">
      <tr v-for="(tr, trindex) in goodsParam.infos" :key="trindex">
        <td class="info-param-key">{{ tr.key }}</td>
        <td class="info-param-value">{{ tr.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParam.image.length !== 0">
      <img :src="goodsParam.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    goodsParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.param-info {
  padding: 0 15px;
}
.key {
  margin: 20px 0;
}
.param-info table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}
.param-info tr {
  line-height: 40px;
  height: 40px;
}
.param-info td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  width: 95px;
}
.info-param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>