<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <svg :fill="item.iconColor" :id="item.icon"><use :xlink:href="item.icon"></use></svg>
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon svg {
    position: relative;
    right: 10px;
    width: 32px;
    height: 32px;
  }

  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }

  #order {
    width: 22px;
    height: 22px;
    background-size: contain;
    top: 4px;
    left: -5px;
    background-image: url("~assets/img/common/icon_myInfo.svg");
  }
  #point {
    width: 18px;
    height: 18px;
    background-size: contain;
    left: -2px;
    background-image: url("~assets/img/common/icon_score.svg");
  }

 #vip {
   width: 26px;
   height: 26px;
   background-repeat: no-repeat;
   background-size: contain;
   background-image: url("~assets/img/common/icon_vip.svg");
   top: 8px;
   left: -5px;
 }

 #service {
   width: 30px;
   height: 30px;
   background-size: contain;
   top: 2px;
   background-image: url("~assets/img/common/icon_cart.svg");
 }

 #download {
   width: 20px;
   height: 20px;
   background-size: contain;
   background-image: url("~assets/img/common/icon_download.svg");
   left: -5px;
 }
</style>
