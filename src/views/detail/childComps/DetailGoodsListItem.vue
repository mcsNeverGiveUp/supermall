<template>
  <div class="goodsItem" @click="goToDetail">
    <img :src="goodsItem.image" :key="goodsItem.acm" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="orgPrice">¥{{goodsItem.price}}</span>
      <span class="price">¥{{goodsItem.discountPrice}}</span>
      <div>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('refresh','图片加载完毕!')
      },
      goToDetail() {
        let iid = this.goodsItem.item_id
        console.log('推荐商品的id:'+iid);
        this.$router.push({path:'/detail', query:{iid}})
      }
    }
  }
</script>

<style scoped>
  .goodsItem {
    padding-bottom: 60px;
    position: relative;
    width: calc(50% - 7.5px);
  }
  .goodsItem img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .orgPrice {
    margin-right: 10px;
    color: #999;
    text-decoration-line: line-through;
    text-decoration-color: #333;
  }

  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 25px;
    font-size: 14px;
  }

  .goods-info .collect {
    position: relative;
    top: 2px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
