<template>
  <div class="mobilegames-conn" style="margin-top: 2.11rem;overflow: visible">
    <!--列表1-->
    <div class="mbilegames-list border-top" style="overflow: visible">
      <v-infinite-scroll
         :start="start"
         :dataArr="list"
         :updateBottom="updateBottom">
        <ul>
          <li class="listware px-30 py-30 bg-fff border-bottom mb-20"
              v-for="item in list">
            <a href="javascript:void(0)" v-if="switchState">
              <div class="mbgmes-img fl"><img src="~images/games-list.png"></div>
              <div class="mbgmes-con">
                <div class="mbl-title f32 color-000">{{item.title}}</div>
                <div class="mbl-cper">
                  <div class="mbl-money color-m1 f32 fl">￥{{item.price}}</div>
                  <div class="mbl-icon fr">
                    <i class="an" v-show="item.is_axm && item.is_axm === 'true'"></i>
                    <!--<i class="shou"></i>-->
                    <i class="tu" v-show="item.is_robot_capture && item.is_robot_capture==='true'"></i>
                  </div>
                </div>
                <div class="mbl-parea color-666 f24">{{item.region_name}}/{{item.server_name}}</div>
              </div>
            </a>
            <a href="javascript:void(0)" v-else>
              <div class="hrgames-titl f32 color-000">{{item.title}}</div>
              <div class="hrgames-img my-20">
                <div class="img-demo fl"><img src="~images/games2-list.png"></div>
                <div class="img-demo fl"><img src="~images/games2-list.png"></div>
                <div class="img-demo fl"><img src="~images/games2-list.png"></div>
              </div>
              <div class="hrgames-tne"><span class="hr-price color-m1 f32 fl">￥{{item.price}}</span> <span
                 class="hr-area f26 color-666 ml-30">{{item.region_name}}/{{item.server_name}}</span></div>
              <div class="hrgames-cfi f26 color-666">
                <i class="firm mr-30 ">首次出售</i>
                <i class="firm mr-30 ">截图认证</i>
              </div>
            </a>
          </li>
        </ul>
        <!-- 没有更多商品 -->
        <div class="tab-empty" v-if="(start&&noNext)||(start&&list.length < pageCount)">
          <div class="empty-conn px-30">
            <div class="list-img"><img src="~images/gamelist.png"></div>
            <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
          </div>
        </div>
      </v-infinite-scroll>
    </div>
    <!--列表2-->
    <div class="mbilegames-list border-top" style="display:none">
      <ul>
        <li class="listware px-30 py-20 bg-fff border-bottom mb-20">

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['goodsList', 'scrollButton', 'switchState'],
    data () {
      return {
        start: false,
        noNext: false
      }
    },
    computed: {
      list () { return this.goodsList.list },
      pageCount () { return this.goodsList.pageCount }
    },
    watch: {
      list (val, old) {
        if (val === null) {
          this.start = false
        }
        if (old === null && val !== null) {
          this.$nextTick(() => {
            this.start = true
          })
        }
      }
    },
    methods: {
      updateBottom () {
        return this.scrollButton().then(d => {
          if (d) this.noNext = true
          return d
        })
      }
    }
  }
</script>
