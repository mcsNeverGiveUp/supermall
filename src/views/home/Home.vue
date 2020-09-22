<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购 物 街</div>
    </nav-bar>
    <h2>拿到的数据...</h2>
    <li v-for="banner in banners" style="list-style: none">
      <div>{{banner.title}}</div>
      <img v-bind:src="banner.image" width="100px" height="50px"/>
    </li>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar
    },
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    computed: {

    },
    created() {
      console.log('创建Home');
      //1.请求多个数据
      this.getMultiData()

    },
    activated() {
      console.log(this.banners);
      console.log(this.recommends);
    },
    deactivated() {

    },
    updated() {

    },
    methods: {
      /*网络请求相关的东西*/
      getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
        })
      },

    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
