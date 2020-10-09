<template>
  <grid-view class="gv">
    <tab-goods-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"></tab-goods-item>
  </grid-view>
</template>

<script>
  import GridView from "components/common/gridView/GridView";
  import TabGoodsItem from "./TabGoodsItem";
  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      TabGoodsItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .gv>div:nth-child(odd) {
    margin-right: 1px;
    margin-left: 4px;
  }
  .gv>div:nth-child(even) {
    margin-left: 1px;
  }
</style>
