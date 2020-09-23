<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <p class="title_LB">{{item.title}}</p>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'common/swiper'

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      stopTimer() {
        this.$refs.swiper.stopTimer();
      },
      startTimer() {
        if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      }
    }
  }
</script>

<style scoped>
  .title_LB {
    display: block;
    position: absolute;
    bottom: 8px;
    width: 120px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background-color: rgba(0,0,0,0.2);
    margin-left:198px;
  }
</style>
