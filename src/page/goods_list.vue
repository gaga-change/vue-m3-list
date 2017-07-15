<template>
  <div>
    <!-- 头部 公共组价
      title<String> 给头部组件配置一个标题
    -->
    <v-header :show="!show.filter" title="gaga"></v-header>
    <!-- top -->
    <div v-show="!show.filter" class="goodslist-01">
      <div class="mobilegames-nav border-bottom mt-97 bg-fff fixed-top" style="z-index: 2">
        <div class="gmnav-mle">
          <!-- 商品类型 -->
          <div class="navdemo" @click="changeShow(showKey._TYPE)"><a href="javascript:void(0)"><span
             class="mold color-666 f30" v-text="goodsType.checked.goodsTypeName || ''"></span></a></div>
          <!-- 服务器选择 -->
          <div class="navdemo" :class="{active: show.server}" @click="changeShow(showKey._SERVER);"><a
             href="javascript:void(0)"><span
             class="server color-666 f30">{{server.menuTopName}}</span></a></div>
          <!-- 排序方式选择 -->
          <div class="navdemo" :class="{active: show.sort}" @click="changeShow(showKey._SORT)"><a
             href="javascript:void(0)"><span
             class="sortin color-666 f30"
             v-text="sort.list[sort.index].sortTypeName">排序</span></a></div>
          <!-- 筛选 -->
          <div class="navdemo" @click="changeShow(showKey._FILTER)"><a href="javascript:void(0)"><span
             class="screen color-666 f30">筛选</span></a></div>
        </div>
        <div class="gmnav-list">
          <!-- 商品类型选择列表 -->
          <v-nav-type
             :show="show.type"
             :goodsType="goodsType"
             @clickItem="typeClick">
          </v-nav-type>
          <!-- 区服选择列表 -->
          <v-nav-server
             :show="show.server"
             :server="server"
             @clickItem="serverClickRight"
             @clickLeft="serverClickLeft">
          </v-nav-server>
          <!-- 排序方式 -->
          <v-nav-sort
             :show="show.sort"
             :sort="sort"
             @clickItem="sortClick">
          </v-nav-sort>
        </div>
      </div>
      <!-- 列表 -->
      <v-list
         :goodsList="goodsList"
         :scrollButton="setGoodsListAdd"></v-list>
      <div class="mstfiv" v-show="mstfivShow" @click="mstfivClick" @touchmove.prevent style="z-index: 1"></div>
    </div>
    <v-filter
       :filter="filter"
       @clickItem="filterClickItem"
       @clear="filterClear"
       @comfirm="filterConfirm"
       :show="show.filter"></v-filter>
  </div>
</template>

<script>
  /*
   * 1. 父组件通过props传值给子组件，子组件必须通过两种方式引用，data和computed
   * 2. 子组件必须要以父组件传入的方法来间接改变 父组件的数据
   * 3. 如果父组件的某个数据需要迁移到vuex中，则无需动子组件，只需改动父组件的代码。关于vuex缓存问题，配置清理方法
   * 4. 开发前预测数据结构，不要纠结很久
   * */

  /*
   * 头部组件（公共）
   *   传递标题，右上按钮点击触发
   * 菜单-4个小组件主菜单由主组件管理 （子组件）
   *   传递列表以及选中的值，点击菜单触发  显示值以及改变触发
   * 列表组件（公共）
   *   显示标题-看能否正常运行。列表显示方式在主组件中
   *   点击右上切换，清空列表，重启拉取列表，但是item结构改变
   * */

  /*
   * 初始启动流程
   * 1. 获取商品类型
   * 2. 获取列表
   * 3. 异步获取平台（额外）
   * */

  import { mapActions } from 'vuex'
  import filterCom from '@/components/goods_list/filter.vue' // 列表
  import listCom from '@/components/goods_list/list.vue' // 列表
  import navTypeCom from '@/components/goods_list/nav_type.vue' // 类型选择
  import navServerCom from '@/components/goods_list/nav_server.vue' // 服务器选择
  import navSortCom from '@/components/goods_list/nav_sort.vue' // 服务器选择
  export default {
    components: {
      'v-list': listCom,
      'v-nav-type': navTypeCom,
      'v-nav-sort': navSortCom,
      'v-nav-server': navServerCom,
      'v-filter': filterCom
    },
    data () {
      return {
        gameId: null, // 游戏id
        goodsType: {list: [], checked: {}}, // 商品类型以及默认选中项
        show: {type: false, server: false, sort: false, filter: false}, // 控制第二层菜单的显示
        showKey: {_TYPE: 'type', _SERVER: 'server', _SORT: 'sort', _FILTER: 'filter'},
        server: {  // 客户端 服务器 平台
          TYPE: {_PLATFORM: 'platform', _CLIENT: 'client', _SERVER: 'server'}, // 三个变量名常亮
          list: {platform: [], client: [], server: []}, // 列表
          checked: {platform: null, client: null, server: null}, // 选中项
          menuLeftName: {platform: '平台', client: '客户端', server: '服务器'}, // 子菜单左侧名
          menuLeftNameDefault: {platform: '平台', client: '客户端', server: '服务器'},
          menuTopName: '服务器', // 主菜单显示名
          outId: 0 // 特殊id， 点击后直接算结束
        },
        sort: {
          list: [
            {'sortTypeId': 1, 'sortTypeName': '最新发布', sortMap: {goods_source_type: '+', create_time: '-'}},
            {
              'sortTypeId': 3,
              'sortTypeName': '价格最低',
              sortMap: {price: '+', goods_source_type: '+', create_time: '-'}
            },
            {
              'sortTypeId': 4,
              'sortTypeName': '价格最高',
              sortMap: {price: '-', goods_source_type: '+', create_time: '-'}
            }
          ],
          index: 0
        },
        goodsList: {
          list: null,
          page: 0,
          pageCount: 10,
          nowParams: '' // 当前商品列表的请求参数
        },
        filter: {
          price: {
            minValue: null,
            maxValue: null,
            list: [
              {min: null, max: null, name: '不限', radio: -1},
              {min: null, max: 50, name: '50元以下', radio: -1},
              {min: 50, max: 100, name: '50-100元', radio: -1},
              {min: 100, max: 500, name: '100-500元', radio: -1},
              {min: 500, max: 1000, name: '500-1000元', radio: -1},
              {min: 1000, max: null, name: '1000元以上', radio: -1}
            ],
            chooseType: 1
          },
          service: {
            list: [
              {name: '安心买', checked: false, key: 'is_axm'},
              {name: '截图认证', checked: false, key: 'is_robot_capture'}
            ],
            chooseType: 2
          },
          CHOOSE_TYPE: {RADIO: 1, CHECK: 2},
          TYPE: {PRICES: 'price', SERVICES: 'service'}
        }
      }
    },
    computed: {
      /* 通过四个菜单是否显示控制幕布的显示 */
      mstfivShow () {
        for (let key in this.show) {
          if (this.show[key]) return true
        }
        return false
      },
      /* 计算获取列表需要的params */
      params () {
        /* 品台、客户端、服务器 */
        let serverParams = {}
        if (this.server.checked.platform) {
          serverParams.service_provider_id = [this.server.checked.platform.id]
        }
        if (this.server.checked.client && this.server.checked.client.id !== this.server.outId) {
          serverParams.region_id = [this.server.checked.client.id]
        }
        if (this.server.checked.server && this.server.checked.server.id !== this.server.outId) {
          serverParams.server_id = [this.server.checked.server.id]
        }
        /* 服务保障 */
        this.filter.service.list.map(v => {
          if (v.checked) {
            serverParams[v.key] = ['true']
          }
        })
        /* 筛选 */
        let betweenMap = {}
        let maxValue = this.filter.price.maxValue || '9999999'
        let minValue = this.filter.price.minValue || '0'
        if (this.filter.price.maxValue || this.filter.price.minValue) {
          betweenMap.price = [minValue + '-' + maxValue]
        }
        /* 主结构 */
        let p = {
          accurateMap: {
            goods_type: ['2'],
            game_id: [this.gameId],
            ...serverParams // 区服、服务保障
          },
          betweenMap: {...betweenMap}, // 价格区间
          keyWordMap: {},
          pageCount: this.goodsList.pageCount,
          sortMap: this.sort.list[this.sort.index].sortMap // 排序方式
        }
        return p
      }
    },
    watch: {
      mstfivShow (val, old) {
        if (old === true && val === false) {
          console.log('幕布关闭，触发初始化')
          this.asyncSetGoodsListInit()
        }
      }
    },
    created () {
      this.init()
    },
    methods: {
      /* 重新配置列表获取列表 */
      async asyncSetGoodsListInit () {
        /* 1. 当幕布回收的时候，判断请求参数（params）是否改变，如果有改变，重启发送请求
         * 2. 数据初始化完毕（init）时, 触发
         */
        if (JSON.stringify(this.params) !== this.goodsList.nowParams) {
          console.log('数据初始化 触发成功')
          /* null 是用来判断列表是否第一次请求（list组件需要），所以第一次请求不能先赋值一个空数组 */
//          if (this.goodsList.list !== null) this.goodsList.list = []
          this.goodsList.list = null
          this.goodsList.page = 0
          this.goodsList.nowParams = JSON.stringify(this.params)
          let data = await this.getGoodsList({...this.params, page: 0})
          this.goodsList.list = this.clone(data)
        }
      },
      /* 列表滚动到底部时, 自动执行该方法 */
      setGoodsListAdd () {
        this.goodsList.page += 1
        return this.getGoodsList({...this.params, page: this.goodsList.page}).then(data => {
          this.goodsList.list.push(...this.clone(data))
          return data.length < this.goodsList.pageCount
        })
        /* 2. 当无限加载被触发的时候，发送请求 */
      },
      /* 筛选点击确定 */
      filterConfirm () {
        this.changeShow(this.showKey._FILTER, false)
      },
      /* 筛选点击重置 */
      filterClear () {
        let filter = this.filter
        this.objMap(filter.TYPE, type => {
          /* 如果是单选的 */
          if (filter[type].chooseType === filter.CHOOSE_TYPE.RADIO) {
            if (type === filter.TYPE.PRICES) {
              filter.price.minValue = filter.price.maxValue = null
            }
            filter[type].list.map(val => {
              val.radio = -1
            })
          } else { // 多选
            filter[type].list.map(val => {
              val.checked = false
            })
          }
        })
      },
      /* 筛选点击选项 */
      filterClickItem ({type, item, index}) {
        let filter = this.filter
        switch (type) {
          case filter.TYPE.PRICES:
            filter.price.list.map(v => { v.radio = -1 })
            item.radio = index
            filter.price.minValue = item.min
            filter.price.maxValue = item.max
            break
          case filter.TYPE.SERVICES:
            item.checked = !item.checked
        }
      },
      /* 排序方式选择，返回的是当前点击的第几个 */
      sortClick (index) {
        this.sort.index = index
        this.changeShow(this.showKey._SORT, false)
      },
      /* 服务器菜单 左侧点击 （平台、客户端、服务器） */
      serverClickLeft (type) {
        switch (type) {
          case this.server.TYPE._PLATFORM :
            clear.call(this, [this.server.TYPE._PLATFORM, this.server.TYPE._CLIENT, this.server.TYPE._SERVER])
            break
          case this.server.TYPE._CLIENT :
            clear.call(this, [this.server.TYPE._CLIENT, this.server.TYPE._SERVER])
            break
          case this.server.TYPE._SERVER :
            clear.call(this, [this.server.TYPE._SERVER])
            break
        }
        function clear (types) {
          types.map(v => {
            this.server.checked[v] = null
            this.server.menuLeftName[v] = this.server.menuLeftNameDefault[v]
          })
        }
      },
      /* 服务器菜单 右侧点击（列表） */
      serverClickRight ({type, item}) {
        /* 如果选中的是 ‘不限’ 则不进入下一页  选择`不限`，然后直接退出 */
        if (item.id === this.server.outId) {
          this.changeShow(this.showKey._SERVER, false)
          this.server.checked[type] = item
          return
        }
        /* 改变选中项 */
        this.server.checked[type] = item
        /* 获取下个值 */
        switch (type) {
          case this.server.TYPE._PLATFORM :
            this.setClient(item.id)
            break
          case this.server.TYPE._CLIENT :
            this.setServer(item.id)
            break
          case this.server.TYPE._SERVER :
            this.changeShow(this.showKey._SERVER, false)
            break
        }
      },
      /* 商品类型选择 */
      typeClick (item) {
        /* 如果 是账号, 收回菜单，如果是其它，跳转页面 */
        if (item.goodsType === this.goodsType.checked.goodsType) {
          this.changeShow(this.showKey._TYPE)
        }
      },
      changeShow (getKey, val) {
        if (val === undefined) val = !this.show[getKey]
        if (!val) this.show[getKey] = false
        else {
          for (let key in this.show) {
            if (getKey === key) this.show[key] = true
            if (getKey !== key) this.show[key] = false
          }
        }
      },
      async init () {
        /* 所有初始化需要的数据，或是需要执行的方法 放置在此处 */
        /* 获取到 gameId */
        let params = this.$route.params
        this.gameId = params.gameId
        /* 配置平台 异步 */
        this.setPlatform()
        /* 配置商品类型,以及默认选中的项 */
        this.goodsType.list = await this.getGoodsTypes({gameId: this.gameId})
        this.goodsType.checked = this.goodsType.list.filter(v => v.goodsType === 2)[0] // 暂时只显示账号
        /* 获取列表 */
        this.asyncSetGoodsListInit()
      },
      /* 获取平台列表 */
      setPlatform () {
        this.server.list.platform = []
        this.getGamePlants({gameId: this.gameId}).then(d => {
          this.server.list.platform = this.clone(d)
        })
      },
      /* 获取客户端列表 */
      async setClient (platformId) {
        this.server.list.client = []
        this.server.list.client = this.clone(await this.getGameClients({
          gameId: this.gameId,
          platformId
        }))
        this.server.list.client.unshift({name: '不限', id: this.server.outId})
      },
      /* 获取服务器列表 */
      async setServer (aid) {
        this.server.list.server = []
        this.server.list.server = this.clone(await this.getGameServers({aid}))
        this.server.list.server.unshift({name: '不限', id: this.server.outId})
      },
      /* 获取商品列表 */
      setGoodsList (obj) {
        console.log(obj)
      },
      /* 幕布点击 */
      mstfivClick () {
        /* 因为控制幕布显示是通过计算属性得到，所有这里不能直接改变值 */
        for (let key in this.show) {
          this.show[key] = false
        }
      },
      ...mapActions([
        'getGoodsTypes',  // 获取商品类型
        'getGamePlants', // 获取平台
        'getGameClients', // 获取客户端
        'getGoodsList', // 获取商品列表
        'getGameServers' // 获取服务器
      ]),
      clone (obj) { // 克隆方法
        return JSON.parse(JSON.stringify(obj))
      },
      objMap (obj, fun) {
        for (let key in obj) {
          fun(obj[key])
        }
      }
    }
  }
</script>
