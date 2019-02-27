import Vue from 'vue'
import Vuex from 'vuex'
import playList from './playList/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    playList
  }
})

export default store
