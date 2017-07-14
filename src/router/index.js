import Vue from 'vue'
import Router from 'vue-router'
const index = r => require.ensure([], () => r(require('@/page/index')), 'index')
const GoodsList = r => require.ensure([], () => r(require('@/page/goods_list')), 'list')
const test = r => require.ensure([], () => r(require('@/page/test')), 'test')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/mg-goods/:gameId',
      name: 'MGGoodsList',
      component: GoodsList
    }
  ]
})
