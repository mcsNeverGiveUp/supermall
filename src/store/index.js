import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  actions: {},
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  },
  mutations: {
    addCart(state, info) {
      console.log(info);
      //查看是否添加过
      const oldInfo = state.cartList.find(item => item.iid === info.iid)
      //2.+1或者新添加
      if (oldInfo) {
        oldInfo.count += 1
      } else {
        info.count = 1
        info.checked = true
        state.cartList.push(info)
      }
    }
  },
  modules: {}
})

export default store
