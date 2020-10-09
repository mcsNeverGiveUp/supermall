import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router"

Vue.config.productionTip = false

//Vue实例可以作为时间总线 可以在组件之间跨通讯
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
