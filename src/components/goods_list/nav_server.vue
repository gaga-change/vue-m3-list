<template>
  <div class="seach-list" v-show="show">
    <div class="gmvst-profile ">
      <div class="gmvst-server fl">
        <ul>
          <!-- 平台 -->
          <li class="border-bottom"
              :class="{choice: checked[PLATFORM], curren: current === PLATFORM }"
              @click="clickLeft(PLATFORM)"
          ><a href="javascript:void(0)">
              <span class="f30 color-000"
                    v-text="menuLeftName[PLATFORM]"><i class="close"></i>
              </span></a></li>
          <!-- 客户端 -->
          <li class="border-bottom"
              :class="{choice: checked[CLIENT], curren: current === CLIENT }"
              @click="clickLeft(CLIENT)"
          ><a href="javascript:void(0)">
              <span class="f30 color-000"
                    v-text="menuLeftName[CLIENT]">
              </span></a></li>
          <!-- 服务器 -->
          <li class="border-bottom"
              :class="{choice: checked[SERVER], curren: current === SERVER }"
              @click="clickLeft(SERVER)"
          ><a href="javascript:void(0)">
            <span class="f30 color-000"
                  v-text="menuLeftName[SERVER]">
            </span></a></li>
        </ul>
      </div>
      <div class="gmvst-area bg-fff">
        <div class="gmvst-server">
          <div class="gvst-seach mx-30 my-20 border py-15 px-20">
            <input class="server-input" name="" type="text"
                   placeholder="请输入服务器名称"></div>
        </div>
        <!-- 平台 -->
        <ul class="pl-30" v-show="current === PLATFORM">
          <li class="border-bottom"
              @click="clickItem(PLATFORM, item)"
              :class="{active: item === checked[PLATFORM]}"
              v-for="item in platforms">
            <span class="f30 color-000" v-text="item.name"></span>
          </li>
        </ul>
        <!-- 客户端 -->
        <ul class="pl-30" v-show="current === CLIENT">
          <li class="border-bottom"
              @click="clickItem(CLIENT, item)"
              :class="{active: item === checked[CLIENT]}"
              v-for="item in clients">
            <span class="f30 color-000" v-text="item.name"></span></li>
        </ul>
        <!-- 服务器 -->
        <ul class="pl-30" v-show="current === SERVER">
          <li class="border-bottom"
              @click="clickItem(SERVER, item)"
              :class="{active: item === checked[SERVER]}"
              v-for="item in servers">
            <span class="f30 color-000" v-text="item.name"></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['show', 'server'],
    computed: {
      TYPE () { return this.server.TYPE },
      /**
       * @returns {string}
       */
      PLATFORM () { return this.server.TYPE._PLATFORM },
      /**
       * @returns {string}
       */
      CLIENT () { return this.server.TYPE._CLIENT },
      /**
       * @returns {string}
       */
      SERVER () { return this.server.TYPE._SERVER },
      list () { return this.server.list },
      checked () { return this.server.checked },
      menuLeftName () { return this.server.menuLeftName },
      menuLeftNameDefault () { return this.server.menuLeftNameDefault },
      outId () { return this.server.outId },
      platforms () { return this.list.platform },
      clients () { return this.list.client },
      servers () { return this.list.server },
      current () {
        let checked = this.checked
        let TYPE = this.TYPE
        if (checked.server) {
          return TYPE._SERVER
        } else if (checked.client && checked.client.id === this.outId) {
          return TYPE._CLIENT
        } else if (checked.client) {
          return TYPE._SERVER
        } else if (checked.platform) {
          return TYPE._CLIENT
        } else {
          return TYPE._PLATFORM
        }
      }
    },
    methods: {
      /* 点击左侧菜单 */
      clickLeft (type) {
        // 当前的和点击的菜单不是同一个，同时点击的菜单并没有东西选中
        if (this.current !== type && this.checked[type] === null) {
          let message
          switch (this.current) {
            case this.PLATFORM:
              message = '请先选择平台'
              break
            case this.CLIENT:
              message = `请先选择客户端`
              break
          }
          this.$toast({message, duration: 3000})
        } else {
          this.$emit('clickLeft', type)
        }
      },
      /* 点击右侧列表 */
      clickItem (type, item) {
//        console.log(type, item)
        this.$emit('clickItem', {type, item})
      }
    }
  }
</script>
