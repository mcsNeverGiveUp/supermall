<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购 物 街</div>
    </nav-bar>

    <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
    <feature-view :features="recommends"></feature-view>
    <recommend-view></recommend-view>
    <tab-control @itemClick="tabClick"
                 :titles="['流行', '新款', '精选']"
                 ref="tabControl" class="tab-control"></tab-control>
    <div style="height: 1000px"></div>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import FeatureView from "./childComps/FeatureView";
  import RecommendView from "./childComps/RecommendView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";

  import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";

  import {POP,SELL,NEW} from "@/common/const";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      FeatureView,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goodsList: {
          'pop': {page: 1, List: []},
          'new': {page: 1, List: []},
          'sell': {page: 1, List:[]}
        },
        currentType: POP,
      }
    },
    computed: {

    },
    created() {
      console.log('创建Home');
      //1.请求多个数据
      this.getMultiData()

      //请求元素数据
     this.getHomeProducts(POP)
     this.getHomeProducts(NEW)
     this.getHomeProducts(SELL)
    },
    activated() {
      this.$refs.hSwiper.startTimer()
    },
    deactivated() {
      this.$refs.hSwiper.stopTimer()
    },
    updated() {

    },
    methods: {
      /*网络请求相关的东西*/
      getMultiData() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
        })
      },
      tabClick: function (index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
      },
      getHomeProducts(type) {
        getHomeData(type, this.goodsList[type].page).then(res => {
          console.log(res);
          const goodsList = res.data.list;
          /*push函数 可变参数 也是结构的思想 把数组传进去再追加到数组中*/
          this.goodsList[type].List.push(...goodsList)
          this.goodsList[type].page += 1
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .tab-control{
    /*滚动锁定的css*/
    position: sticky;
    top:44px;
  }
</style>
