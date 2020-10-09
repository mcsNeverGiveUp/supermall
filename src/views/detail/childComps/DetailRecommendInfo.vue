<template>
  <div class="recommend-info" v-if="recommendList.length !== 0">
    <div class="info-header">热门推荐</div>
    <grid-view class="gv">
      <detail-goods-list-item v-for="(item, index) in recommendList" :key="index" :goodsItem="item"></detail-goods-list-item>
    </grid-view>
  </div>
</template>

<script>
  import GridView from "components/common/gridView/GridView";
  import DetailGoodsListItem from "./DetailGoodsListItem";

  export default {
    name: "DetailRecommendInfo",
    components: {
      GridView,
      DetailGoodsListItem
    },
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
  .gv>div:nth-child(odd) {
    margin-right: 2.5px;
    margin-left: 5px;
  }
  .gv>div:nth-child(even) {
    margin-left: 2.5px;
  }
</style>
