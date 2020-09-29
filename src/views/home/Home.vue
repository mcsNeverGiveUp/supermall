<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购 物 街</div>
    </nav-bar>
    <tab-control @itemClick="tabClick"
                 :titles="['流行', '新款', '精选']"
                 class="fixed" v-show="isTabFixed" ref="tabHide"></tab-control>
  <scroll class="content" ref="scroll"
          @scroll="contentScroll" @pullingUp="loadMore"
          :data="showGoodsList" :pull-up-load="true" :probe-type="3">
    <div>
      <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
      <feature-view :features="recommends"></feature-view>
      <recommend-view></recommend-view>
      <tab-control @itemClick="tabClick"
                   :titles="['流行', '新款', '精选']"
                   ref="tabControl"></tab-control>
      <goods-list :goodsList="showGoodsList"></goods-list>
    </div>
    <back-top class="back-top" @backTop="backTop" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </scroll>

  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import FeatureView from "./childComps/FeatureView";
  import RecommendView from "./childComps/RecommendView";

  import Scroll from 'common/scroll/Scroll'
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/backTop";

  import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";

  import {POP,SELL,NEW,BACKTOP_DISTANCE} from "@/common/const";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      FeatureView,
      RecommendView,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goodsList: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list:[]}
        },
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        showBackTop:false
      }
    },
    computed: {
      showGoodsList(){
        return this.goodsList[this.currentType].list
      }
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
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh,600)
      //调用太频繁 可以使用防抖debounce/节流throttle函数
      this.$bus.$on('refresh', (msg) =>{
        refresh(msg)
      })
    },
    methods: {
      /*网络请求相关的东西*/
      getMultiData() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list

          //每个组件都有$el对象 可以拿到组件内相关属性
          this.$nextTick(() => {
            this.tabOffsetTop =this.$refs.tabControl.$el.offsetTop
            console.log(this.tabOffsetTop);
          })
        })
      },
      tabClick: function (index) {
        this.$refs.tabHide.$data.currentIndex = index;
        this.$refs.tabControl.$data.currentIndex = index;
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
      contentScroll(position) {
        //决定 tabFixed是否显示
        this.isTabFixed = position.y < -this.tabOffsetTop


        // 决定backTop是否显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE
      },
      loadMore() {
        this.getHomeProducts(this.currentType)
      },
      backTop() {
        console.log("回到顶部");
        this.$refs.scroll.scrollTo(0,0,600)
      },
      getHomeProducts(type) {
        getHomeData(type, this.goodsList[type].page).then(res => {
          console.log(res);
          console.log(this.goodsList[type].page);
          const goodsList = res.data.list;
          /*push函数 可变参数 也是结构的思想 把数组传进去再追加到数组中*/
          this.goodsList[type].list.push(...goodsList)
          this.goodsList[type].page += 1
          //完成此次的上拉加载后 未下次下拉加载准备
          this.$refs.scroll.finishPullUp()
        })
      },
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args);
            console.log(args);
          },delay)
        }
      }

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
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
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  .back-top {
    position: fixed;
    bottom: 48px;
    right: 10px;
    z-index: 998;
  }
</style>
