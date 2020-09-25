import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tabControlIndex: 0
}

const store = new Vuex.Store({
  state,
  actions: {},
  getters: {},
  mutations: {
    changeTabControlIndex(state, index) {
        state.tabControlIndex = index
    }
  },
  modules: {}
})

export default store
