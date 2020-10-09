<template>
  <nav-bar class="detail-nav">
    <img src="~assets/img/common/back.svg" class="back" slot="left" @click="back">
    <div class="title" slot="center">
      <span class="title-item" v-for="(item,index) in titleInfos" :key="index"
            :class="{'active': index === currentIndex}" @click="itemClick(index)" >
        {{item}}
      </span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        currentIndex : this.initCurrentIndex
      }
    },
    props: {
      titleInfos: {
        type: Array,
        default() {
          return ['商品', '参数', '评论', '推荐']
        }
      },
      initCurrentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      itemClick: function (index) {
        this.currentIndex = index;
        this.$emit('itemClick', index)
      },
      back: function () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
 .detail-nav {
   background-color: #fff;
   font-weight: normal;
   box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
 }
  .title {
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }
   .title-item {
     flex: 1;
   }

   .active {
     color: var(--color-high-text);
   }

   .back {
     margin-top: 12px;
   }
</style>
