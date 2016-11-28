import Vue from 'vue'
import App from './App'
import store from './store'
import VueRouter from 'vue-router'
import Index from './page/Index/Index'
import Search from './page/Search/Search'
import Detail from './page/Detail/Detail'
import BookMark from './page/BookMark/BookMark'

import 'assets/theme/skin/css/theme.css'
import 'assets/theme/skin/css/main.css'
// import 'style/main.css'

Vue.use(VueRouter)

// meta: { scrollToTop: true }
const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Index },
    { path: '/search', name: 'search', component: Search, meta: { scrollToTop: true } },
    { path: '/bookmark', name: 'bookmark', component: BookMark, meta: { scrollToTop: true } },
    { path: '/detail/:id', name: 'detail', component: Detail, meta: { scrollToTop: true } },
    { path: '*', redirect: '/' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
