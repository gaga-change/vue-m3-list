<template>
  <div>
    <!-- 头部 公共组价
      title<String> 给头部组件配置一个标题
    -->
    <v-header title="gaga"></v-header>
    <!-- top -->
    <div class="goodslist-01">
      <div class="mobilegames-nav border-bottom mt-97 bg-fff fixed-top" style="z-index: 2">
        <div class="gmnav-mle">
          <!-- 商品类型 -->
          <div class="navdemo" @click="changeShow(showKey._TYPE)"><a href="javascript:void(0)"><span
             class="mold color-666 f30" v-text="goodsType.checked.goodsTypeName || ''"></span></a></div>
          <!-- 服务器选择 -->
          <div class="navdemo" :class="{active: show.server}" @click="changeShow(showKey._SERVER);"><a
             href="javascript:void(0)"><span
             class="server color-666 f30">{{this.server.menuTopName}}</span></a></div>
          <!-- 排序方式选择
          <div class="navdemo" :class="{active: show.sort}" @click="changeShow('sort')"><a
             href="javascript:void(0)"><span
             class="sortin color-666 f30" v-text="sortChecked.sortTypeName">排序</span></a></div>
          &lt;!&ndash; 筛选 &ndash;&gt;
          <div class="navdemo" @click="changeShow('filter')"><a href="javascript:void(0)"><span
             class="screen color-666 f30">筛选</span></a></div>-->
        </div>
        <div class="gmnav-list">
          <!-- 商品类型选择列表 -->
          <v-nav-type
             :show="show.type"
             :goodsType="goodsType"
             @clickItem="typeClick"
          >
          </v-nav-type>
          <!-- 区服选择列表 -->
          <v-nav-server
             :show="show.server"
             :server="server"
             @clickItem="serverClickRight"
             @clickLeft="serverClickLeft"
          >
          </v-nav-server>
          <!-- 排序方式 -->
          <!--<div class="seach-list" v-show="show.sort">
            <div class="gmvst-mold">
              <ul>
                <li v-for="item in sorts" class="f30 border-bottom px-30 "
                    @click="sortChecked = item;changeShow('sort', false)"
                    :class="{active: item === sortChecked}"><span>{{item.sortTypeName}}</span></li>
              </ul>
            </div>
          </div>-->
        </div>
      </div>
      <!-- 列表 -->
      <v-list></v-list>
      <div class="mstfiv" v-show="mstfivShow" @click="mstfivClick" @touchmove.prevent style="z-index: 1"></div>
    </div>
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
  import listCom from '@/components/goods_list/list.vue' // 列表
  import navTypeCom from '@/components/goods_list/nav_type.vue' // 类型选择
  import navServerCom from '@/components/goods_list/nav_server.vue' // 服务器选择
  export default {
    components: {
      'v-list': listCom,
      'v-nav-type': navTypeCom,
      'v-nav-server': navServerCom
    },
    data () {
      return {
        gameId: null, // 游戏id
        goodsType: {list: [], checked: {}}, // 商品类型以及默认选中项
        show: {type: false, server: false, sort: false, filter: false}, // 控制第二层菜单的显示
        showKey: {_TYPE: 'type', _SERVER: 'server', _SORT: 'sort', _FILTER: 'sort'},
        server: {  // 客户端 服务器 平台
          TYPE: {_PLATFORM: 'platform', _CLIENT: 'client', _SERVER: 'server'}, // 三个变量名常亮
          list: {platform: [], client: [], server: []}, // 列表
          checked: {platform: null, client: null, server: null}, // 选中项
          menuLeftName: {platform: '平台', client: '客户端', server: '服务器'}, // 子菜单左侧名
          menuLeftNameDefault: {platform: '平台', client: '客户端', server: '服务器'},
          menuTopName: '服务器', // 主菜单显示名
          outId: 0 // 特殊id， 点击后直接算结束
        }
      }
    },
    computed: {
      mstfivShow () {
        for (let key in this.show) {
          if (this.show[key]) return true
        }
        return false
      }
    },
    created () {
      this.init()
    },
    methods: {
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
        /* 所有初始化需要的数据 放置在此处 */
        let params = this.$route.params
        /* 获取到 gameId */
        this.gameId = params.gameId
        /* 配置商品类型,以及默认选中的项 */
        this.goodsType.list = await this.getGoodsTypes({gameId: this.gameId})
        this.goodsType.checked = this.goodsType.list.filter(v => v.goodsType === 2)[0] // 暂时只显示账号
        /* 配置平台 异步 */
        this.setPlatform()
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
        'getGameServers' // 获取服务器
      ]),
      clone (obj) { // 克隆方法
        return JSON.parse(JSON.stringify(obj))
      }
    }
  }
</script>

<style src='css/common/list-cl.css'></style>
