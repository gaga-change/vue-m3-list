// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import headerCom from '@/common/header.vue'
import infiniteScroll from '@/common/infinite_scroll.vue'
Vue.config.productionTip = false

Vue.use(Mint)
Vue.use(VueAwesomeSwiper)
/* 公共组件注册 */
Vue.component('v-header', headerCom)
Vue.component('v-infinite-scroll', infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
