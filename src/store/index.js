import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import bookmark from './modules/bookmark'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    bookmark
  },
  strict: true
})
