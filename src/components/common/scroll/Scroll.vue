<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      /*侦测类型
      * 0 1 不侦测
      * 2 手指滚动侦测 惯性移动不侦测
      * 3 只要滚动就侦测
      * */
      probeType: {
        type: Number,
        default: 1
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: {}
      }
    },
    mounted() {
      setTimeout(this.__initScroll,20)
    },
    methods: {
      __initScroll() {
        //初始化BScroll对象
        if(!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad
        })
        //2.将监听事件回调
        this.scroll.on('scroll',pos => {
          this.$emit('scroll', pos)
        })
        //3.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
        console.log(this.scroll)
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      }
    },
    watch: {
      data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>

</style>
