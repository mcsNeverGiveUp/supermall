<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <tab-control :titles="['综合', '新品', '销量']"
                   @itemClick="tabClick"
                   v-show="isFixed"
                   class="fixed_tabControl" ref="tab_controlFixed"></tab-control>
      <scroll id="tab-content" :data="[subcategories,categoryDetail]"
              :probe-type="3" @scroll="contentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick" ref="tab_control"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "common/navbar/NavBar";

  import TabMenu from "./childComps/TabMenu";
  import TabContentDetail from "./childComps/TabContentDetail";
  import TabContentCategory from "./childComps/TabContentCategory";

  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      Scroll,
      TabControl,
      TabContentDetail,
      TabContentCategory
    },
    mixins:[tabControlMixin],
    data() {
      return {
        categories:[],
        subcategories: {},
        categoryDetail: {
          'pop': [],
          'new': [],
          'sell': []
        },
        currentIndex: 0,
        currentType: 'pop',
        isFixed: false
      }
    },
    //组件创建完后创建
    created() {
      /*请求分页数据*/
      this._getCategory()
    },
    mounted() {
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          /*获取分类数据*/
          this.categories = res.data.category.list
          console.log(this.categories);
          /*初始化每个类别的子数据*/
          /*for(let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }*/
          /*请求第一个分类的数据*/
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          /*获取子分类数据*/
          this.subcategories = res.data
          console.log(this.subcategories);
         /* /!*对象的解构加入*!/
          this.categoryData = {...this.categoryData}*/
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
        //1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        /*发送请求 传入miniWallKey和type*/
        getCategoryDetail(miniWallkey, type).then(res => {
          //把请求的数据保存
         /* this.categoryData[this.currentIndex].categoryDetail[type] = res*/
          this.categoryDetail[type] = res
          console.log(res);
          /*this.categoryData = {...this.categoryData}*/
        })
      },
      /*点击切换*/
      selectItem(index) {
        console.log('点击了'+index);
        this._getSubcategories(index)
      },
      contentScroll(position) {
        this.isFixed = position.y < -this.$refs.tab_control.$el.offsetTop
      },
      tabClick(index) {
        /*虽然混入了 但是这里要做特定处理*/
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
        console.log(this.currentType);
        this.$refs.tab_control.$data.currentIndex = index
        this.$refs.tab_controlFixed.$data.currentIndex = index
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        /*return this.categoryData[this.currentIndex].subcategories*/
        return this.subcategories
      },
      showCategoryDetail() {
        if(this.currentIndex === -1) return []
        /*return this.categoryData[this.currentIndex].categoryDetail[this.currentType]*/
        return this.categoryDetail[this.currentType]
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
  .fixed_tabControl {
    position: fixed;
    top: 44px;
    left: 20%;
    right: 0;
  }
</style>
