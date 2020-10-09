<template>
  <div id="detail">
    <detail-nav-bar @itemClick="titleClick" :init-current-index="currentIndex" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll"
            :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommendList]"
            :probe-type="3">
       <div>
        <detail-swiper :top-images="topImages" ref="base"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <detail-recommend-info :recommend-list="recommendList" ref="recommend"></detail-recommend-info>
      </div>
  </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/backTop";

  import Scroll from "components/common/scroll/Scroll";
  import {getDetail,Goods,Shop,GoodsParam,getReCommand} from "network/detail";
  import {BACKTOP_DISTANCE} from "@/common/const";
  import {backTopMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      Scroll,
      DetailBottomBar,
      BackTop
    },
    mixins : [backTopMixin],
    data() {
      return {
        iid: '',
        currentIndex: 0,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTops: []
      }
    },
    created() {
      this._getDetailData()
      this._getRecommend()
    },
    mounted() {
      console.log(this.iid);
    },
    updated() {
      this._getOffsetTops()
    },
    methods: {
      _getOffsetTops() {
        this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      contentScroll(position) {
        // backTop的显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE

        this._listenScrollTheme(-position.y)
      },
      _listenScrollTheme(position) {
        let length = this.themeTops.length;

        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
              this.$refs.detailNavBar.$data.currentIndex = this.currentIndex
            }
            break;
          }
        }
      },
      titleClick: function (index) {
        console.log(this.themeTops[index]);
        //只控制滑动
        this.$refs.scroll.scrollTo(0,-this.themeTops[index], 100)
      },
      _getDetailData() {
        //保存iid
        this.iid = this.$route.query.iid
        //请求数据通过iid
        getDetail(this.iid).then(res => {
          console.log(res);
          //请求到的数据 开始分开
          const data = res.result
          //获取顶部数据
          this.topImages = data.itemInfo.topImages;
          //获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          //获取店铺信息
          this.shop = new Shop(data.shopInfo)
          //获取商品细节信息
          this.detailInfo = data.detailInfo
          //保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          //保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      _getRecommend() {
        getReCommand().then((res, err) => {
          if(err) return
          this.recommendList = res.data.list
          console.log(this.recommendList);
        })
      },
      addToCart() {
       const obj = {}
       obj.iid = this.iid
       obj.imgURL = this.topImages[0]
       obj.title = this.goods.title
       obj.desc = this.goods.desc
       obj.newPrice = this.goods.nowPrice

       console.log(obj);
        //添加到Store
       this.$store.commit('addCart', obj)
      }
    }
  }
</script>

<style scoped>
  #detail {
    /*视口高度*/
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
  .back-top {
    position: fixed;
    bottom: 65px;
    right: 10px;
  }
</style>
