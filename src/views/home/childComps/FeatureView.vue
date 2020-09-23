<template>
  <div class="feature">
    <div class="feature-item" v-for="(item,index) in features">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    props: {
      features: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .feature {
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;
  }

  .feature-item {
    flex: 1;
    text-align: center;
  }

  .feature img {
    width: 68px;
    height: 68px;
    margin-bottom: 10px;
  }
</style>
