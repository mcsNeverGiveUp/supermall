<template>
  <div  class="tab-control">
    <div class="tab-control-item"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)"
         v-for="(item,index) in titles">
         <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick: function (index) {
        this.currentIndex = index;
        this.$emit('itemClick', index)
      }
    }
  }
</script>



<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #ffffff;
    z-index:9;
  }
  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
