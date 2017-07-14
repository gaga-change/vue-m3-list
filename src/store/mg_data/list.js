/**
 * Created by yanjd on 2017/7/10.
 */

import { typeList } from '../types'
let api = {}

/**
 * 获取游戏列表
 * @param state
 * @param commit
 * @param fn  # 回调函数
 * @param params
 * {gameType: 1 | 2, pageIndex: 1, pageSize: 9999} 1端游 2是手游
 */
api.getMobileGames = function ({state, commit}, {fn, params}) {
  console.log('获取游戏列表：', state._games.length)
  if (state._games.length) {
    setTimeout(fn(state._games), 0)
    return
  }
  state.axios.get(state.CONSTANTS.APICategory + 'category/searchgamelistbytype', {params}).then(res => {
    fn(res.data.categoryList || [])
    commit(typeList.setGames, res.data.categoryList || [])
  }, () => {
    console.error('手游游戏列表请求错误 (╯‵□′)╯︵┻━┻')
    fn([])
  })
}

/**
 * 获取游戏商品类型
 * @param state
 * @param commit
 * @param params = {gameId}
 * @returns {Promise}
 */
api.getGoodsTypes = function ({state, commit}, params) {
  return new Promise((resolve, reject) => {
    let id = params.gameId
    if (state._goods_types.list.length && state._goods_types.id === id) {
      console.log('获取商品列表：', state._goods_types.list.length)
      setTimeout(resolve(state._goods_types.list), 0)
      return
    }
    state.axios.get(state.CONSTANTS.APICategory + 'category/searchgoodstypebygameid', {params}).then(res => {
      res = {list: res.data.goodsTypeList || [], id}
      resolve(res.list)
      commit(typeList.setGoodsTypes, res)
    }, () => {
      console.error('手游商品列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取游戏平台
 * @param state
 * @param commit
 * @param params {gameId}
 * @returns {Promise}
 */
api.getGamePlants = function ({state, commit}, params) {
  return new Promise((resolve, reject) => {
    let id = params.gameId
    if (state._game_platform.list.length && state._game_platform.id === id) {
      console.log('获取平台列表：', state._game_platform.list.length)
      setTimeout(resolve(state._game_platform.list), 0)
      return
    }
    state.axios.get(state.CONSTANTS.APICategory + '/mainMobileGame/getplatforminfobygameid', {params}).then(res => {
      res = {list: res.data.data || [], id}
      resolve(res.list)
      commit(typeList.setGamePlatform, res)
    }, () => {
      console.error('平台列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取游戏客户端
 * @param state
 * @param commit
 * @param params = {gameId, platformId}
 * @returns {Promise}
 */
api.getGameClients = function ({state, commit}, params) {
  return new Promise((resolve, reject) => {
    let id = JSON.stringify(params)
    if (state._game_client.list.length && state._game_client.id === id) {
      console.log('缓存客户端列表', state._game_client.list.length)
      setTimeout(resolve(state._game_client.list), 0)
      return
    }
    state.axios.get(state.CONSTANTS.APICategory + '/mainMobileGame/getgameareasbygameandplatform', {params}).then(res => {
      res = {list: res.data.data || [], id}
      resolve(res.list)
      commit(typeList.setGameClient, res)
    }, () => {
      console.error('客户端列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取服务器列表
 * @param state
 * @param commit
 * @param params = {aid}
 * @returns {Promise}
 */
api.getGameServers = function ({state, commit}, params) {
  return new Promise((resolve, reject) => {
    let id = JSON.stringify(params)
    if (state._game_server.list.length && state._game_server.id === id) {
      console.log('缓存服务器列表', state._game_server.list.length)
      setTimeout(resolve(state._game_server.list), 0)
      return
    }
    state.axios.get(state.CONSTANTS.APICategory + '/mainMobileGame/getgameServer', {params}).then(res => {
      res = {list: res.data.data || [], id}
      resolve(res.list)
      commit(typeList.setGameServer, res)
    }, () => {
      console.error('服务器列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 *  获取商品列表
 * @param state
 * @param commit
 * @param params {...}
 * @returns {Promise}
 */
api.getGoodsList = function ({state, commit}, params) {
  return new Promise((resolve, reject) => {
    state.axios.post(state.CONSTANTS.APISearch + '/goodsSearch/goodsSearchList', params).then(({data}) => {
      data = JSON.parse(data.result)
      resolve(data.items || [])
    }, () => {
      console.log('商品列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
api.test = function () {
  return new Promise((resolve, reject) => {
    console.log('test in ')
    setTimeout(function () {
      resolve(1)
      console.log('test out ')
    }, 1000)
  })
}

export default {
  ...api
}
