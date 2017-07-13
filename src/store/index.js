/**
 * Created by yanjd on 2017/7/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import axios from 'axios'
import { CONSTANTS } from './config/constants'
import { typeList } from './types'
import mgList from './modules/mg_list'
// import * as getters from './getters'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    CONSTANTS, // api 请求的前缀
    axios, // 引入 axios
    test: 0,
    _games: [],  // 首页所有手游游戏对象，内部使用
    _account_goods: { list: [], id: '' },  // 账号商品列表页
    _goods_types: {list: [], id: ''}, // 游戏商品类型
    _game_platform: {list: [], id: ''}, // 游戏平台
    _game_client: {list: [], id: ''}, // 游戏客户端
    _game_server: {list: [], id: ''} // 游戏服务器
  },
  mutations: {
    test (state, num) { state.test = num },
    [typeList.setGames] (state, d) { state._games = d }, // 设置游戏 列表
    [typeList.setAccountGoods] (state, d) { state._account_goods = d }, // 设置 账号商品列表
    [typeList.setGoodsTypes] (state, d) { state._goods_types = d }, // 设置 账号商品列表
    [typeList.setGamePlatform] (state, d) { state._game_platform = d }, // 设置 平台
    [typeList.setGameClient] (state, d) { state._game_client = d }, // 设置 客户端
    [typeList.setGameServer] (state, d) { state._game_server = d } // 设置 服务器
  },
  actions,
  // getters,
  modules: {
    mgList
    // products
  },
  strict: debug
})
